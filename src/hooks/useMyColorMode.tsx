import { useState } from 'react'

type ColorMode = 'light' | 'dark'

const allModes: ColorMode[] = ['light', 'dark'];

export const useMyColorMode = () => {
  const [index, setIndex] = useState(0);

  return {
    colorMode: allModes[index],
    toggleColorMode: () => setIndex(i => 1 - i),
  }
}
