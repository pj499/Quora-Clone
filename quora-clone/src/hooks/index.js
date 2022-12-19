import { useState, useContext } from "react"
import { userLogin, userLogout, verifyUserToken } from "../utility";
import { AuthContext } from "../provider/AuthProvider";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";


export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userToken = localStorage.getItem('access-token');
        // console.log("userToken: ", userToken);
        if (userToken) {
            const user = jwtDecode(userToken);
            setUser(user);
        }
        setLoading(false);
    }, []);
    const login = async (email, password) => {
        // console.log("inside hooks login")
        const response = await userLogin(email, password);
        const responseJson = await response.json();

        if (response.status == 200) {
            setUser(responseJson.user);
            responseJson.status = 200;
        } else {
            responseJson.status = response.status;
        }
        // console.log("responseJson",responseJson)
        setLoading(false);
        return responseJson;
    }
    const logout = async ()=>{
        const response = await userLogout();
        const responseJson = await response.json();
        console.log("hooks logout: ",responseJson);
        if(response.status==200){
            setUser(null);
            localStorage.removeItem('access-token');
            responseJson.status=200;
        }else{
            responseJson.status=400;
        }
        setLoading(false);
        return responseJson;
    }
    const verifyToken = async ()=>{
        const response = await verifyUserToken();
        const responseJson = await response.json();
        if(response.status!=200){
            setUser(null);
            localStorage.removeItem('access-token');
            responseJson.status=400;
        }else{
            responseJson.status=200;
        }
        setLoading(false);
        return responseJson
    }
    return {
        user,
        loading,
        login,
        logout,
        verifyToken
    }
};

export const useAuth = () => {
    return useContext(AuthContext);
}