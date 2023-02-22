import { useContext } from 'react'
import './App.css'
import { Button, Flex, useColorMode } from '@chakra-ui/react'
import { Post } from './Post'
import { PostContext, PostSwitchContext } from './context/post-context'

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const postState = useContext(PostContext);
  const switchFunction = useContext(PostSwitchContext);

  const toggle = () => {
    switchFunction();
    toggleColorMode();
  }

  return (
    <>
      <Flex
        as='header'
        position='sticky'
        top={0}
        zIndex={200}
        alignItems='center'
        width='100%'
        // backgroundColor={'var(--chakra-colors-chakra-body-bg)'}
        backgroundColor={ colorMode === 'dark' ? 'gray.700' : 'gray.300' }
      >
        <Button onClick={toggle}>
          Toggle
        </Button>
      </Flex>
      <Flex flexDirection='column' alignItems='center' pt={8} className="App">
        <Post
          postController={postState.postControllers[postState.currentIndex]}
        />
      </Flex>
    </>
  )
}

export default App
