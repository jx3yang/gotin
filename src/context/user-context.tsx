import { createContext, useState } from 'react'
import { theUser, theUserAnon } from '../data/users';
import { User } from '../types'

const users = [theUser, theUserAnon];

export const UserContext = createContext<User>(theUser);
export const ToggleUserContext = createContext<() => void>(() => {})

interface Props {
  children: JSX.Element
}

export const UserProvider = ({ children }: Props) => {
  const [index, setIndex] = useState(0);
  const toggle = () => {
    setIndex(i => 1 - i);
  }

  return (
    <UserContext.Provider value={users[index]}>
      <ToggleUserContext.Provider value={toggle}>
        {children}
      </ToggleUserContext.Provider>
    </UserContext.Provider>
  )
}
