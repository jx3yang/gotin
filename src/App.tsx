import { useEffect, useState } from 'react'
import './App.css'
import { Button, Flex, useColorMode } from '@chakra-ui/react'
import { Avatar, User, Comment } from './types'
import { Post } from './Post'

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [commentsState, setCommentsState] = useState<Comment[]>([]);

  const authorAvatar: Avatar = {
    id: 'jxyang',
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
  ];

  const comments: Comment[] = [...staticComments, ...staticComments, ...staticComments];

  useEffect(() => {
    const getNewComment = (index: number): Comment => ({ ...comments[index], replies: [] });
    const getNewState = (currentState: Comment[]) => {
      const { length } = currentState;
      if (length == 0) {
        return [getNewComment(0)];
      }
      const lastComment = currentState[length-1];
      if (lastComment.replies.length == comments[length-1].replies.length) {
        if (length == comments.length) {
          return currentState;
        }
        return [...currentState, getNewComment(length)];
      }
      const newReply = comments[length-1].replies[lastComment.replies.length];
      lastComment.replies.push(newReply);
      return [...currentState];
    }

    const intervalId = setInterval(() => {
      setCommentsState(currentState => {
        const newState = getNewState(currentState);
        return newState;
      });
    }, 2000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <>
      <Flex
        as='header'
        position='sticky'
        top={0}
        zIndex={200}
        alignItems='center'
        width='100%'
        backgroundColor={'var(--chakra-colors-chakra-body-bg)'}
      >
        <Button onClick={toggleColorMode}>
          Toggle
        </Button>
      </Flex>
      <Flex flexDirection='column' alignItems='center' pt={8} className="App">
        <Post author={author} post={post} comments={commentsState} />
      </Flex>
    </>
  )
}

export default App
