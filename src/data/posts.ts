import { Avatar, Comment, PostData, User } from '../types'

const authorAvatar: Avatar = {
  id: 'jx3yang',
  url: 'https://avatars.githubusercontent.com/u/65411020?v=4',
};

const author: User = {
  username: 'Ji Xi Yang',
  title: 'Train operator',
  avatar: authorAvatar,
};

const post = 'Trains are so fun! I think they should teach embedded systems in kindergarten :o';
const commonComment: Comment = {
  author,
  content: "Trains are very fun! I especially like the part where you learn to sleep in the lab. Definitely agree with the kindergarten part lol",
  replies: [],
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

const comments: Comment[] = [...staticComments, ...staticComments, ...staticComments];

const post2 = "Should I go to UWaterloo or UofT??";
const commonComment2: Comment = {
  author,
  content: "Lol only UW rejects go to UofT",
  replies: [],
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
const comments2: Comment[] = [...staticComments2, ...staticComments2, ...staticComments2];

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
    author,
    post: post2,
    comments: comments2,
    stats: {
      likes: 0,
      numComments: comments2.map(getNumComments).reduce(add, comments2.length),
    },
  },
];

export { allPosts };
