import { Comment, PostData, User } from '../types'
import { ItIterator } from './it-iterator'
import { Iterator } from './iterator'
import { TreeIteratorItem, TreeLevelIterator } from './tree-iterator'

type ReplyKey = { parentId: number, index: number };

const findParentComment = (
  path: number[],
  currentComments: Comment[],
  userAddedCommentsIndices: number[],
  userAddedReplies: ReplyKey[],
) => {
  let index = path[0];
  for (let i = 0; i < userAddedCommentsIndices.length; i++) {
    if (userAddedCommentsIndices[i] <= index) {
      index++;
    } else {
      break;
    }
  }
  let parentComment = currentComments[index];
  for (let i = 1; i < path.length - 1; i++) {
    let subIndex = path[i];
    let pid = parentComment.id;
    subIndex += userAddedReplies.filter(({ parentId, index: idx }) => parentId === pid && idx <= subIndex).length;
    parentComment = parentComment.replies[subIndex];
  }
  return parentComment;
}

const getNewComments = (
  currentComments: Comment[],
  iterator: Iterator<TreeIteratorItem<Comment>>,
  userAddedCommentsIndices: number[],
  userAddedReplies: ReplyKey[],
  nextId: number,
  targetNumLikes: Map<number, number>,
) => {
  if (!iterator.hasNext()) {
    return { comments: currentComments, hasChanged: false };
  }
  const item = iterator.next();
  const { node: newComment, path } = item;
  if (newComment.stats.likes > 0) {
    targetNumLikes.set(nextId, newComment.stats.likes);
  }
  if (path.length == 1) {
    return { comments: [...currentComments, { ...newComment, replies: [], id: nextId, stats: { likes: 0 } }], hasChanged: true };
  }
  let parentComment = findParentComment(path, currentComments, userAddedCommentsIndices, userAddedReplies);
  // let index = path[0];
  // for (let i = 0; i < userAddedCommentsIndices.length; i++) {
  //   if (userAddedCommentsIndices[i] <= index) {
  //     index++;
  //   } else {
  //     break;
  //   }
  // }

  // let parentComment = currentComments[index];
  // for (let i = 1; i < path.length - 1; i++) {
  //   parentComment = parentComment.replies[path[i]];
  // }
  parentComment.replies.push({ ...newComment, replies: [], id: nextId, stats: { likes: 0 } });
  return { comments: [...currentComments], hasChanged: true };
}

export class PostController {
  commentTreeIterator: Iterator<TreeIteratorItem<Comment>>
  postData: PostData
  userHasLiked: boolean
  userAddedCommentsIndices: number[]
  userAddedReplies: ReplyKey[]
  nextId: number
  userLikedComments: Set<number>
  targetNumLikes: Map<number, number>

  constructor(post: string, staticComments: Comment[], author: User) {
    this.postData = {
      author,
      post,
      stats: {
        numComments: 0,
        likes: 0,
      },
      comments: [],
    }
    this.commentTreeIterator = new ItIterator(
      staticComments.map((comment, index) => new TreeLevelIterator(comment, ({ replies }: Comment) => replies, index)));
    this.userHasLiked = false;
    this.userAddedCommentsIndices = [];
    this.nextId = 0;
    this.userLikedComments = new Set<number>();
    this.targetNumLikes = new Map<number, number>();
    this.userAddedReplies = [];
  }

  step() {
    const { comments, hasChanged } = getNewComments(
      this.postData.comments,
      this.commentTreeIterator,
      this.userAddedCommentsIndices,
      this.userAddedReplies,
      this.nextId,
      this.targetNumLikes,
    );
    if (hasChanged) {
      this.postData.comments = comments;
      this.postData.stats.numComments++;
      this.nextId++;
      return true;
    }
    return false;
  }

  stepLikes() {
    if (this.targetNumLikes.size > 0) {
      const keys = [...this.targetNumLikes.keys()];
      const id = keys[Math.floor(Math.random() * keys.length)];
      const numLikesRemaining = this.targetNumLikes.get(id)!;
      const comment = this.findComment(id, this.postData.comments);
      if (comment) {
        comment.stats.likes++;
      }
      if (numLikesRemaining == 1) {
        this.targetNumLikes.delete(id);
      } else {
        this.targetNumLikes.set(id, numLikesRemaining-1);
      }
      return true;
    }
    return false;
  }

  getCurrentComments() {
    return this.postData.comments;
  }

  getPost() {
    return this.postData.post;
  }

  getAuthor() {
    return this.postData.author;
  }

  getNumComments() {
    return this.postData.stats.numComments;
  }

  getNumLikes() {
    return this.postData.stats.likes;
  }

  getStats() {
    return this.postData.stats;
  }

  getUserHasLiked() {
    return this.userHasLiked;
  }

  getUserLikedComments() {
    return this.userLikedComments;
  }

  incrementLike() {
    this.postData.stats.likes++;
  }

  decrementLike() {
    this.postData.stats.likes--;
  }

  userLikeToggle() {
    if (this.userHasLiked) {
      this.decrementLike()
      this.userHasLiked = false;
    } else {
      this.incrementLike();
      this.userHasLiked = true;
    }
  }

  addUserComment(user: User, content: string) {
    const comment = { author: user, content, replies: [], stats: { likes: 0 }, id: this.nextId };
    this.postData.comments.push({...comment});
    this.nextId++;
    this.postData.stats.numComments++;
    this.userAddedCommentsIndices.push(this.postData.comments.length - 1);
  }

  addUserReply(user: User, content: string, parentCommentId: number) {
    const comment = { author: user, content, replies: [], stats: { likes: 0 }, id: this.nextId };
    const parentComment = this.findComment(parentCommentId, this.postData.comments);
    if (parentComment) {
      parentComment.replies.push({...comment});
      this.nextId++;
      this.postData.stats.numComments++;
      this.userAddedReplies.push({ parentId: parentCommentId, index: parentComment.replies.length - 1 });
    }
  }

  likeComment(id: number) {
    const comment = this.findComment(id, this.postData.comments);
    if (comment) {
      comment.stats.likes++;
    }
  }

  userToggleCommentLike(id: number) {
    const comment = this.findComment(id, this.postData.comments);
    if (comment) {
      if (this.userLikedComments.has(id)) {
        this.userLikedComments.delete(id);
        comment.stats.likes--;
      } else {
        this.userLikedComments.add(id);
        comment.stats.likes++;
      }
    }
  }

  findComment(id: number, comments: Comment[]): Comment | null {
    if (comments.length === 0) {
      return null;
    }
    let finds = comments.filter(comment => comment.id === id);
    if (finds.length !== 0) {
      return finds[0];
    }
    let find: Comment | null = null;
    for (let i = 0; i < comments.length; i++) {
      find = this.findComment(id, comments[i].replies);
      if (find !== null) {
        return find;
      }
    }
    return null;
  }
};
