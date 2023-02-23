import { Comment, PostData } from '../types'
import { allUsers } from './users'

const getUser = (index: number) => allUsers[index % allUsers.length];

let currentUserIndex = 0;

const withRandomAuthors = (comments: Comment[]) => {
  return comments.map(comment => {
    const copy = {...comment};
    copy.author = getUser(currentUserIndex++);
    copy.replies = withRandomAuthors(copy.replies);
    return copy;
  });
}

const author = getUser(currentUserIndex++);

const post = 'Trains are so fun! I think they should teach embedded systems in kindergarten :o';
const commonComment: Comment = {
  id: 0,
  author,
  content: "Trains are very fun! I especially like the part where you learn to sleep in the lab. Definitely agree with the kindergarten part lol",
  replies: [],
  stats: {
    likes: 0,
  },
};
const staticComments: Comment[] = [
  {
    ...commonComment,
    replies: [
      commonComment,
      commonComment,
    ],
  },
  {
    ...commonComment,
  },
  {
    ...commonComment,
    replies: [
      {
        ...commonComment,
        replies: [commonComment, commonComment],
      },
    ],
  },
];

const comments: Comment[] = withRandomAuthors([...staticComments, ...staticComments, ...staticComments]);

const author2 = getUser(currentUserIndex++);
const post2 = "Should I go to UWaterloo or UofT??";
const commonComment2: Comment = {
  id: 0,
  author: author2,
  content: "Lol only UW rejects go to UofT",
  replies: [],
  stats: {
    likes: 0,
  },
};
const staticComments2: Comment[] = [
  {
    ...commonComment2,
    replies: [
      {
        ...commonComment2,
        replies: [
          commonComment2,
          commonComment2,
          commonComment2,
        ],
      },
    ],
  },
  {
    ...commonComment2,
  },
  {
    ...commonComment2,
    replies: [
      commonComment2,
    ],
  },
];
const comments2: Comment[] = withRandomAuthors([...staticComments2, ...staticComments2, ...staticComments2]);

const add = (a: number, b: number) => a + b;
const getNumComments = ({ replies }: Comment): number => replies.map(getNumComments).reduce(add, 1);

const allPosts: PostData[] = [
  {
    author,
    post: post,
    comments: comments,
    stats: {
      likes: 0,
      numComments: comments.map(getNumComments).reduce(add, comments.length),
    },
  },
  {
    author: author2,
    post: post2,
    comments: comments2,
    stats: {
      likes: 0,
      numComments: comments2.map(getNumComments).reduce(add, comments2.length),
    },
  },
];

export { allPosts };
