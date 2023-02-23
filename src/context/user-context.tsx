import { createContext, useState } from 'react'
import { theUser } from '../data/users';
import { User } from '../types'

export const UserContext = createContext<User>(theUser);

interface Props {
  children: JSX.Element
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(theUser);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
