import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PostProvider } from './context/post-context'
import './index.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ColorModeScript/>
    <ChakraProvider theme={theme}>
      <PostProvider>
        <App />
      </PostProvider>
    </ChakraProvider>
  </>,
)
