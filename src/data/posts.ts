import { PostData } from '../types'
import { nonAnonUsers, anonUsers } from './users'

const getNonAnonUser = (index: number) => nonAnonUsers[index % nonAnonUsers.length];
const getAnonUser = (index: number) => anonUsers[index % anonUsers.length];

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
  author: getAnonUser(4),
  post: `Thoughts on the UW engineering entrance interview? Can I use chatgpt for that sh*t?`,
  comments: [
    {
      id: 0,
      author: getAnonUser(5),
      content: `Just b urself lol`,
      replies: [
        {
          id: 0,
          author: getAnonUser(4),
          content: `No i wanna be batman, does that mean that im failing the interview?`,
          replies: [],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 1,
      }
    },
    {
      id: 0,
      author: getAnonUser(6),
      content: `idk ask your academic advisor`,
      replies: [
        {
          id: 0,
          author: getAnonUser(4),
          content: `he said i should ask on gotin`,
          replies: [
            {
              id: 0,
              author: getAnonUser(6),
              content: `then ask chatgpt`,
              replies: [],
              stats: {
                likes: 1,
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
    {
      id: 0,
      author: getAnonUser(7),
      content: `yup you can use chatgpt. the interviewer will be chatgpt itself actually`,
      replies: [
        {
          id: 0,
          author: getAnonUser(4),
          content: `it's always been my dream to put my academic fate into the hands of a robot beep boop`,
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

const post_6: PostData = {
  author: getAnonUser(8),
  post: `Do you use your university's servers for anything other than school or research work? I mine crypto on one of my school's data science clusters`,
  comments: [
    {
      id: 0,
      author: getAnonUser(9),
      content: `Lol nice try IT department`,
      replies: [
        {
          id: 0,
          author: getAnonUser(8),
          content: `for real though, with the tuition that i pay, im probably entitled to using some of that infra for my own projects`,
          replies: [],
          stats: {
            likes: 0,
          },
        }
      ],
      stats: {
        likes: 1,
      }
    },
    {
      id: 0,
      author: getAnonUser(0),
      content: `any normal school server will be able to detect suspiscious activities, there's no way you can mine crypto on there`,
      replies: [
        {
          id: 0,
          author: getAnonUser(8),
          content: `well it just means that you arent smart enough to find loopholes`,
          replies: [
            {
              id: 0,
              author: getAnonUser(0),
              content: `pic or didnt happen`,
              replies: [],
              stats: {
                likes: 1,
              },
            },
          ],
          stats: {
            likes: 2,
          },
        },
      ],
      stats: {
        likes: 0,
      },
    },
  ],
  stats: {
    likes: 0,
    numComments: 1,
  }
}

export const nonAnonPosts = [post_1, post_2, post_3]
export const anonPosts = [post_4, post_5, post_6]
