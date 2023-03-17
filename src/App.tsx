import { useContext } from 'react'
import './App.css'
import { Flex, Card, useColorMode, Image, Spacer, Switch } from '@chakra-ui/react'
import { Post } from './Post'
import { PostContext, PostSwitchContext } from './context/post-context'
import { ToggleUserContext } from './context/user-context'

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const postsState = useContext(PostContext);
  const switchFunction = useContext(PostSwitchContext);
  const toggleUser = useContext(ToggleUserContext);

  const toggle = () => {
    switchFunction();
    toggleColorMode();
    toggleUser();
  }

  return (
    <>
      <Flex
        as='header'
        position='sticky'
        top={0}
        zIndex={200}
        alignItems='center'
        justifyContent={'center'}
        width='100%'
        height={'62px'}
        backgroundColor={ colorMode === 'dark' ? 'gray.700' : 'white' }
      >
        <Card width={{ base: '100%', md: 600 }} p={0} m={0} boxShadow={'none'} height='100%'>
          <Flex alignItems={'center'} height='100%'>
            <Image src={'/G.png'} height={'48px'} borderRadius={'4'} />
            <Spacer />
            <Switch colorScheme='red' onChange={toggle}/>
          </Flex>
        </Card>
      </Flex>
      <Flex
        flexDirection='column'
        alignItems='center'
        pt={8}
        className="App"
        gap={'8'}
        height='100%'
        pb='16'
        backgroundColor={colorMode === 'dark' ? 'var(--chakra-colors-chakra-body-bg)' : '#f3f2ef'}
      >
        {
          postsState.anonActive
            ? postsState.anonPostControllers.map((controller, index) => (
              <Post postController={controller} index={index} />
            ))
            : postsState.nonAnonPostControllers.map((controller, index) => (
              <Post postController={controller} index={index} />
            ))
        }
      </Flex>
    </>
  )
}

export default App
