import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  // useSystemColorMode: true,
}

const breakpoints = {
  md: '600px',
}

const theme = extendTheme({ config, breakpoints })

export default theme
