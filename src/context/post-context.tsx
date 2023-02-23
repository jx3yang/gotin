import { Context, createContext, Provider, useContext, useEffect, useMemo, useState } from 'react'
import { allPosts } from '../data/posts';
import { PostController } from '../lib/post-controller';
import { PostStats } from '../types';
import { UserContext } from './user-context';

type PostState = {
  postControllers: PostController[]
  currentIndex: number
}

const getStartState = () => ({
  postControllers: allPosts.map(({ post, comments, author }) => new PostController(post, comments, author)),
  currentIndex: 0,
})

export const PostContext = createContext<PostState>(getStartState());
export const PostStepContext = createContext<() => void>(() => {});
export const PostSwitchContext = createContext<() => void>(() => {});
export const PostLikeContext = createContext<() => void>(() => {});
export const PostStatsContext = createContext<PostStats>({ likes: 0, numComments: 0 });
export const PostUserHasLikedContext = createContext<boolean>(false);
export const PostCommentContext = createContext<(content: string) => void>(() => {});
export const PostCommentLikeContext = createContext<(id: number) => void>(() => {});
export const PostUserLikedCommentsContext = createContext<Set<number>>(new Set());

interface Props {
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

export const PostProvider = ({ children }: Props) => {
  const [postState, setPostState] = useState<PostState>(getStartState());
  const user = useContext(UserContext);

  const stepContext = () => {
    setPostState(currentState => {
      const { postControllers, currentIndex } = currentState;
      postControllers[currentIndex].step();
      return {...currentState};
    });
  };

  const switchContext = () => {
    setPostState(currentState => {
      const { currentIndex } = currentState;
      return {
        ...currentState,
        currentIndex: 1 - currentIndex,
      };
    });
  };

  const likeContext = () => {
    setPostState(currentState => {
      const { postControllers, currentIndex } = currentState;
      postControllers[currentIndex].userLikeToggle();
      return {...currentState};
    })
  };

  const addCommentContext = (content: string) => {
    setPostState(currentState => {
      const { postControllers, currentIndex } = currentState;
      postControllers[currentIndex].addUserComment(user, content);
      return {...currentState};
    });
  };

  const likeCommentContext = (id: number) => {
    setPostState(currentState => {
      const { postControllers, currentIndex } = currentState;
      postControllers[currentIndex].userToggleCommentLike(id);
      return {...currentState};
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      stepContext();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return contextsReducer([
    {
      context: PostContext,
      value: postState,
    },
    {
      context: PostStepContext,
      value: stepContext,
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
      context: PostStatsContext,
      value: postState.postControllers[postState.currentIndex].getStats(),
    },
    {
      context: PostUserHasLikedContext,
      value: postState.postControllers[postState.currentIndex].getUserHasLiked(),
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
      value: postState.postControllers[postState.currentIndex].getUserLikedComments(),
    },
  ], children);
}
