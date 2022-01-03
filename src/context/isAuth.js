import {useContext, createContext, useState} from "react"

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(() => {
        if(localStorage.getItem("user")) return true
        return false
    })
    return <AuthContext.Provider value={{isAuth, setIsAuth}}>
        {children}
    </AuthContext.Provider>
}

export const useIsAuthContext = () => useContext(AuthContext)