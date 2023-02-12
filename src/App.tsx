import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { PostHeader } from './PostHeader'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
    <div className="App">
      <PostHeader username='Ji Xi Yang' title='Train Operator' post='Trains are so fun! I think they should teach embedded systems in kindergarten :o' />
    </div>
    </ChakraProvider>
  )
}

export default App
