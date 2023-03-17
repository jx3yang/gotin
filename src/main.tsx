import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PostProvider } from './context/post-context'
import { UserProvider } from './context/user-context'
import './index.css'
import theme from './theme'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const DynamicApp = ()  => {
  return (
    <>
      <ColorModeScript/>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <PostProvider isStatic={false}>
            <App />
          </PostProvider>
        </UserProvider>
      </ChakraProvider>
    </>
  )
}

const StaticApp = ()  => {
  return (
    <>
      <ColorModeScript/>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <PostProvider isStatic={true}>
            <App />
          </PostProvider>
        </UserProvider>
      </ChakraProvider>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <DynamicApp />,
  },
  {
    path: '/static',
    element: <StaticApp />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    {/* <ColorModeScript/>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <PostProvider isStatic={true}>
          <App />
        </PostProvider>
      </UserProvider>
    </ChakraProvider> */}
  </>,
)
