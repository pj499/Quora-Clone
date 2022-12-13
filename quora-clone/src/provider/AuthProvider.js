
import { createContext } from "react";
import { useProvideAuth } from "../hooks";

const initialState = {
    user: null,
    login:()=>{},
    isLoggedIn:false,
    loading: true
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children})=>{
    const auth = useProvideAuth();
    return(<AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

