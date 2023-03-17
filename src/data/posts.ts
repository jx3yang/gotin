import { Comment, PostData } from '../types'
import { allUsers, nonAnonUsers, anonUsers } from './users'

const getNonAnonUser = (index: number) => nonAnonUsers[index % nonAnonUsers.length];
const getAnonUser = (index: number) => anonUsers[index % anonUsers.length];

let currentUserIndex = 0;

const withRandomAuthors = (comments: Comment[], anon: boolean) => {
  return comments.map(comment => {
    const copy = {...comment};
    copy.author = anon ? getAnonUser(currentUserIndex++) : getNonAnonUser(currentUserIndex++);
    copy.replies = withRandomAuthors(copy.replies, anon);
    return copy;
  });
}

const author = getNonAnonUser(currentUserIndex++);

const post = 'Trains are so fun! I think they should teach embedded systems in kindergarten :o';
const commonComment: Comment = {
  id: 0,
  author,
  content: "Trains are very fun! I especially like the part where you learn to sleep in the lab. Definitely agree with the kindergarten part lol",
  replies: [],
  stats: {
    likes: 5,
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

const comments: Comment[] = withRandomAuthors([...staticComments, ...staticComments, ...staticComments], false);

const author2 = getAnonUser(currentUserIndex++);
const post2 = "Should I go to UWaterloo or UofT??";
const commonComment2: Comment = {
  id: 0,
  author: author2,
  content: "Lol only UW rejects go to UofT",
  replies: [],
  stats: {
    likes: 3,
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
const comments2: Comment[] = withRandomAuthors([...staticComments2, ...staticComments2, ...staticComments2], true);

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

const post_1: PostData = {
  author: getNonAnonUser(0),
  post: `I'm excited to announce that I will be starting my Bachelor's of Science at McGill University starting this Fall! I could not be more thrilled to be pursuing a degree that aligns with my passion!`,
  comments: [
    {
      id: 0,
      author: getNonAnonUser(1),
      content: 'Congratulations!',
      replies: [
        {
          id: 0,
          author: getNonAnonUser(0),
          content: 'Thank you!',
          replies: [],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 2,
      }
    },
    {
      id: 0,
      author: getNonAnonUser(2),
      content: 'Fantastic news! McGill is lucky to have you as student :)',
      replies: [
        {
          id: 0,
          author: getNonAnonUser(0),
          content: 'Thank you!',
          replies: [],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 3,
      },
    },
    {
      id: 0,
      author: getNonAnonUser(3),
      content: 'McGill is a great university, great job!',
      replies: [
        {
          id: 0,
          author: getNonAnonUser(0),
          content: 'Thank you!',
          replies: [],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

const post_2: PostData = {
  author: getNonAnonUser(4),
  post: `I will be joining the Class of 2027 at the University of Waterloo in the Fall. I'm so happy to be able to attend my dream school! If anyone else is headed to UW, let's connect :)`,
  comments: [
    {
      id: 0,
      author: getNonAnonUser(5),
      content: `Welcome to the best Canadian university!`,
      replies: [
        {
          id: 0,
          author: getNonAnonUser(4),
          content: 'Thank you!',
          replies: [],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 2,
      }
    },
    {
      id: 0,
      author: getNonAnonUser(6),
      content: `I will be attending UW in the Fall as well! What is your major?`,
      replies: [
        {
          id: 0,
          author: getNonAnonUser(4),
          content: `Awesome! I'll be majoring in Computer Science :D`,
          replies: [
            {
              id: 0,
              author: getNonAnonUser(6),
              content: `I'm also a CS major, let's connect :)`,
              replies: [],
              stats: {
                likes: 1,
              },
            }
          ],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 3,
      },
    },
    {
      id: 0,
      author: getNonAnonUser(7),
      content: `UW let's go!!`,
      replies: [
        {
          id: 0,
          author: getNonAnonUser(4),
          content: 'Yess!',
          replies: [],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

const post_3: PostData = {
  author: getNonAnonUser(8),
  post: `What are the best things about studying engineering at the University of Waterloo?`,
  comments: [
    {
      id: 0,
      author: getNonAnonUser(7),
      content: `Can't go wrong with UW! We have the best engineering programs in the country`,
      replies: [
        {
          id: 0,
          author: getNonAnonUser(8),
          content: 'Thanks for the insight!',
          replies: [],
          stats: {
            likes: 1,
          },
        }
      ],
      stats: {
        likes: 2,
      }
    },
    {
      id: 0,
      author: getNonAnonUser(9),
      content: `One of the best things about UW engineering is probably the coop program. You essentially graduate with 2 years of work experience and that in itself is priceless.`,
      replies: [
        {
          id: 0,
          author: getNonAnonUser(8),
          content: `I've heard about the coop program! The only concern I have is that coop search might eat too much into my time... Is that an issue that UW students face?`,
          replies: [
            {
              id: 0,
              author: getNonAnonUser(9),
              content: `That definitely does happen, unfortunately. Sometimes you can't have your cake and eat it too. Most people in engineering come the UW because the coop program gives you a head start in your post-graduation career. It might seem like a dilemma at first, but you will be able to figure out your priorities.`,
              replies: [],
              stats: {
                likes: 1,
              },
            }
          ],
          stats: {
            likes: 1,
          },
        },
      ],
      stats: {
        likes: 3,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

const post_4: PostData = {
  author: getAnonUser(0),
  post: `UW vs McGill Computer Science. Which one is better?`,
  comments: [
    {
      id: 0,
      author: getAnonUser(1),
      content: `Neither lol it's either MIT or Stanford for CS. Or did you perhaps get a subpar SAT score? XD`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `No one asked for you opinion of US unis. Learn to read?`,
          replies: [
            {
              id: 0,
              author: getAnonUser(1),
              content: `Lol op why so mad? Stop behaving like a typical sub 400 SAT scorer`,
              replies: [],
              stats: {
                likes: 1
              },
            },
          ],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 2,
      }
    },
    {
      id: 0,
      author: getAnonUser(2),
      content: `Whichever offers the bigger scholarship`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `Gotta give it to GotIners for the most constructive comments..`,
          replies: [],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
    {
      id: 0,
      author: getAnonUser(3),
      content: `who asked? who cares?`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `I asked and I care`,
          replies: [
            {
              id: 0,
              author: getAnonUser(3),
              content: `i AsKeD aNd I cArE`,
              replies: [],
              stats: {
                likes: 0,
              },
            },
          ],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

const post_5: PostData = {
  author: getAnonUser(0),
  post: `UW vs McGill Computer Science. Which one is better?`,
  comments: [
    {
      id: 0,
      author: getAnonUser(1),
      content: `Neither lol it's either MIT or Stanford for CS. Or did you perhaps get a subpar SAT score? XD`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `No one asked for you opinion of US unis. Learn to read?`,
          replies: [
            {
              id: 0,
              author: getAnonUser(1),
              content: `Lol op why so mad? Stop behaving like a typical sub 400 SAT scorer`,
              replies: [],
              stats: {
                likes: 1
              },
            },
          ],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 2,
      }
    },
    {
      id: 0,
      author: getAnonUser(2),
      content: `Whichever offers the bigger scholarship`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `Gotta give it to GotIners for the most constructive comments..`,
          replies: [],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
    {
      id: 0,
      author: getAnonUser(3),
      content: `who asked? who cares?`,
      replies: [
        {
          id: 0,
          author: getAnonUser(0),
          content: `I asked and I care`,
          replies: [
            {
              id: 0,
              author: getAnonUser(3),
              content: `i AsKeD aNd I cArE`,
              replies: [],
              stats: {
                likes: 0,
              },
            },
          ],
          stats: {
            likes: 0,
          },
        },
      ],
      stats: {
        likes: 1,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

export const nonAnonPosts = [post_1, post_2, post_3]
export const anonPosts = [post_4]
