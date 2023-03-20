import { Context, createContext, Provider, useContext, useEffect, useMemo, useState } from 'react'
import { nonAnonPosts, anonPosts } from '../data/posts';
import { PostController } from '../lib/post-controller';
import { PostStats } from '../types';
import { UserContext } from './user-context';

type PostState = {
  postControllers: PostController[]
  currentIndex: number
}

type PostsState = {
  nonAnonPostControllers: PostController[]
  anonPostControllers: PostController[]
  anonActive: boolean
}

const getStartPostsState = () => ({
  nonAnonPostControllers: nonAnonPosts.map(({ post, comments, author }) => new PostController(post, comments, author)),
  anonPostControllers: anonPosts.map(({ post, comments, author }) => new PostController(post, comments, author)),
  anonActive: false,
})

export const PostContext = createContext<PostsState>(getStartPostsState());
export const PostStepContext = createContext<() => void>(() => {});
export const PostSwitchContext = createContext<() => void>(() => {});
export const PostLikeContext = createContext<(index: number) => void>(() => {});
export const PostGetStatsContext = createContext<(index: number) => PostStats>(() => ({ likes: 0, numComments: 0 }));
export const PostUserHasLikedContext = createContext<(index: number) => boolean>(() => false);
export const PostCommentContext = createContext<(content: string, index: number) => void>(() => {});
export const PostCommentLikeContext = createContext<(id: number, index: number) => void>(() => {});
export const PostUserLikedCommentsContext = createContext<(index: number) => Set<number>>(() => new Set());
export const PostReplyContext = createContext<(content: string, index: number, parentCommentId: number) => void>(() => {});

interface Props {
  isStatic: boolean
  children: JSX.Element
}

const providersReducer = (pairs: { provider: Provider<any>, value: any }[], children: JSX.Element) => {
  return pairs.reduce<JSX.Element>((acc: JSX.Element, pair: { provider: Provider<any>, value: any }) => (
    <pair.provider value={pair.value}>
      {acc}
    </pair.provider>
  ), children);
}

const contextsReducer = (pairs: { context: Context<any>, value: any }[], children: JSX.Element) =>
  providersReducer(pairs.map(({ context, value }) => ({ provider: context.Provider, value })), children);

export const PostProvider = ({ isStatic, children }: Props) => {
  const [postsState, setPostsState] = useState<PostsState>(getStartPostsState());
  const user = useContext(UserContext);

  const shuffle = (a: number[]) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const stepContext = () => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        const order = shuffle(Array(anonPostControllers.length).fill(0).map((_, index) => index));
        for (let i = 0; i < anonPostControllers.length; ++i) {
          if (anonPostControllers[order[i]].step()) {
            break;
          }
        }
        return {...currentState};
      } else {
        const order = shuffle(Array(nonAnonPostControllers.length).fill(0).map((_, index) => index));
        for (let i = 0; i < nonAnonPostControllers.length; ++i) {
          if (nonAnonPostControllers[order[i]].step()) {
            break;
          }
        }
        return {...currentState};
      }
    });
  };

  const stepLikes = () => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        const order = shuffle(Array(anonPostControllers.length).fill(0).map((_, index) => index));
        for (let i = 0; i < anonPostControllers.length; ++i) {
          if (anonPostControllers[order[i]].stepLikes()) {
            break;
          }
        }
        return {...currentState};
      } else {
        const order = shuffle(Array(nonAnonPostControllers.length).fill(0).map((_, index) => index));
        for (let i = 0; i < nonAnonPostControllers.length; ++i) {
          if (nonAnonPostControllers[order[i]].stepLikes()) {
            break;
          }
        }
        return {...currentState};
      }
    });
  };

  const switchContext = () => {
    setPostsState(currentState => {
      const { anonActive } = currentState;
      return {
        ...currentState,
        anonActive: !anonActive,
      };
    });
  };

  const likeContext = (index: number) => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        anonPostControllers[index].userLikeToggle();
        return {...currentState};
      } else {
        nonAnonPostControllers[index].userLikeToggle();
        return {...currentState};
      }
    });
  };

  const addCommentContext = (content: string, index: number) => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        anonPostControllers[index].addUserComment(user, content);
        return {...currentState};
      } else {
        nonAnonPostControllers[index].addUserComment(user, content);
        return {...currentState};
      }
    });
  };

  const addReplyContext = (content: string, index: number, parentCommentId: number) => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        anonPostControllers[index].addUserReply(user, content, parentCommentId);
        return {...currentState};
      } else {
        nonAnonPostControllers[index].addUserReply(user, content, parentCommentId);
        return {...currentState};
      }
    });
  };

  const likeCommentContext = (id: number, index: number) => {
    setPostsState(currentState => {
      const { nonAnonPostControllers, anonPostControllers, anonActive } = currentState;
      if (anonActive) {
        anonPostControllers[index].userToggleCommentLike(id);
        return {...currentState};
      } else {
        nonAnonPostControllers[index].userToggleCommentLike(id);
        return {...currentState};
      }
    });
  };

  const getStats = (index: number) => {
    const { nonAnonPostControllers, anonPostControllers, anonActive } = postsState;
    if (anonActive) {
      return anonPostControllers[index].getStats();
    } else {
      return nonAnonPostControllers[index].getStats();
    }
  };

  const getUserHasLiked = (index: number) => {
    const { nonAnonPostControllers, anonPostControllers, anonActive } = postsState;
    if (anonActive) {
      return anonPostControllers[index].getUserHasLiked();
    } else {
      return nonAnonPostControllers[index].getUserHasLiked();
    }
  };

  const getUserLikedComments = (index: number) => {
    const { nonAnonPostControllers, anonPostControllers, anonActive } = postsState;
    if (anonActive) {
      return anonPostControllers[index].getUserLikedComments();
    } else {
      return nonAnonPostControllers[index].getUserLikedComments();
    }
  };

  useEffect(() => {
    const stepInterval = setInterval(() => {
      stepContext();
    }, isStatic ? 0 : 2000);

    const likesInterval = setInterval(() => {
      stepLikes();
    }, isStatic ? 0 : 1000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(likesInterval);
    }
  }, []);

  return contextsReducer([
    {
      context: PostContext,
      value: postsState
    },
    {
      context: PostSwitchContext,
      value: switchContext,
    },
    {
      context: PostLikeContext,
      value: likeContext,
    },
    {
      context: PostGetStatsContext,
      value: getStats,
    },
    {
      context: PostUserHasLikedContext,
      value: getUserHasLiked,
    },
    {
      context: PostCommentContext,
      value: addCommentContext,
    },
    {
      context: PostCommentLikeContext,
      value: likeCommentContext,
    },
    {
      context: PostUserLikedCommentsContext,
      value: getUserLikedComments,
    },
    {
      context: PostReplyContext,
      value: addReplyContext,
    },
  ], children);
}
