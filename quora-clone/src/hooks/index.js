import { useState, useContext } from "react"
import { userLogin } from "../utility";
import { AuthContext } from "../provider/AuthProvider";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";


export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const userToken = localStorage.getItem('access-token');
        console.log("userToken: ", userToken);
        if (userToken) {
            const user = jwtDecode(userToken);
            console.log('user: ', user);
            console.log("date now:", Date.now())
            let currentDate = Date.now();
            console.log((new Date(currentDate).toString() < new Date(user.exp).toString()));
            if (new Date(currentDate).toString() < new Date(user.exp).toString()) {
                setUser(user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
                localStorage.removeItem('access-token');
            }
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        const response = await userLogin(email, password);
        const responseJson = await response.json();
        if (response.status == 200) {
            setUser(responseJson.user);
            responseJson.status = 200;
        } else {
            responseJson.status = 400;
        }
        setLoading(false);
        setIsLoggedIn(true);
        return responseJson;
    }

    return {
        user,
        loading,
        login,
        isLoggedIn
    }
};

export const useAuth = () => {
    return useContext(AuthContext);
}