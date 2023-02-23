import { Comment, PostData, User } from '../types'
import { ItIterator } from './it-iterator'
import { Iterator } from './iterator'
import { TreeIteratorItem, TreeLevelIterator } from './tree-iterator'

const getNewComments = (
  currentComments: Comment[],
  iterator: Iterator<TreeIteratorItem<Comment>>,
  userAddedCommentsIndices: number[],
) => {
  if (!iterator.hasNext()) {
    return { comments: currentComments, hasChanged: false };
  }
  const item = iterator.next();
  const { node: newComment, path } = item;
  if (path.length == 1) {
    return { comments: [...currentComments, { ...newComment, replies: [] }], hasChanged: true };
  }
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
    parentComment = parentComment.replies[path[i]];
  }
  parentComment.replies.push({ ...newComment, replies: [] });
  return { comments: [...currentComments], hasChanged: true };
}

export class PostController {
  commentTreeIterator: Iterator<TreeIteratorItem<Comment>>
  postData: PostData
  userHasLiked: boolean
  userAddedCommentsIndices: number[]

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
  }

  step() {
    const { comments, hasChanged } = getNewComments(
      this.postData.comments,
      this.commentTreeIterator,
      this.userAddedCommentsIndices,
    );
    if (hasChanged) {
      this.postData.comments = comments;
      this.postData.stats.numComments++;
    }
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
    const comment = { author: user, content, replies: [] };
    this.postData.comments.push({...comment});
    this.postData.stats.numComments++;
    this.userAddedCommentsIndices.push(this.postData.comments.length - 1);
  }
};
