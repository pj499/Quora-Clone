import {React, createContext} from 'react'

const userInitialState={
    user: null,
    isAuthenticated: false,
}

export const UserContext= createContext(userInitialState);



