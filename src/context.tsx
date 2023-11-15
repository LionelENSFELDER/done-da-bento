import { createContext, useState } from 'react'
import { User } from "firebase/auth";

type GlobalContextType = {
  userLogged: User | null;
  updateUserLogged: (user: User) => void;
}

const defaultContextValue = {
  userLogged: null,
  updateUserLogged: () => { }
}

export const GlobalContext = createContext<GlobalContextType>(defaultContextValue)

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userLogged, setUserLogged] = useState<User | null>(null!)
  const updateUserLogged = (user: User) => {
    setUserLogged(user)
  }
  return (
    <GlobalContext.Provider value={{ userLogged, updateUserLogged }}>
      {children}
    </GlobalContext.Provider>
  )
}