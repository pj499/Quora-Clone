
import { createContext } from "react";
import { useProvideAuth } from "../hooks";

const initialState = {
    user: null,
    login:()=>{},
    logout:()=>{},
    verifyToken:()=>{},
    googleSignIn:()=>{},
    googleSignIn:()=>{},
    setGoogleSign:()=>{},
    isGoogleSignIn:false,
    isLoggedIn:false,
    loading: true
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children})=>{
    
    const auth = useProvideAuth();
    // console.log("AuthProvider",auth)
    return(<AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

