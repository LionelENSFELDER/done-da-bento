import { createContext, useState } from 'react'
import { User } from "firebase/auth";

type GlobalContextType = {
  userLogged: User | string;
  updateUserLogged: (user: User) => void;
}

const defaultContextValue = {
  userLogged: 'unknow',
  updateUserLogged: () => { }
}

export const GlobalContext = createContext<GlobalContextType>(defaultContextValue)

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userLogged, setUserLogged] = useState<User | string>('Anonymous')
  const updateUserLogged = (user: User) => {
    setUserLogged(user)
  }
  return (
    <GlobalContext.Provider value={{ userLogged, updateUserLogged }}>
      {children}
    </GlobalContext.Provider>
  )
}