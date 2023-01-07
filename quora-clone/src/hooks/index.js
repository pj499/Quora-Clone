import { useState, useContext } from "react";
import { userLogin, userLogout, verifyUserToken, getUser } from "../utility";
import { AuthContext } from "../provider/AuthProvider";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGoogleSignIn, setGoogleSignIn] = useState(false);
  useEffect(async () => {
    const userToken = localStorage.getItem("access-token");
    // console.log("userToken: ", userToken);
    if (userToken) {
      const user = await jwtDecode(userToken);
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
  };
  const logout = async () => {
    const response = await userLogout();
    const responseJson = await response.json();
    console.log("hooks logout: ", responseJson);
    if (response.status == 200) {
      setUser(null);
      localStorage.removeItem("access-token");
      if (localStorage.getItem("isGoogleSignIn")) {
        localStorage.removeItem("isGoogleSignIn");
      }
      responseJson.status = 200;
    } else {
      responseJson.status = 400;
    }
    setLoading(false);
    return responseJson;
  };
  const verifyToken = async () => {
    const response = await verifyUserToken();
    const responseJson = await response.json();
    if (response.status != 200) {
      setUser(null);
      localStorage.removeItem("access-token");
      responseJson.status = 400;
    } else {
      responseJson.status = 200;
    }
    setLoading(false);
    return responseJson;
  };
  const googleSignIn = async () => {
    const response = await getUser();
    const responseJson = await response.json();

    if (response.status == 200) {
      setUser(responseJson.user);
      responseJson.status = 200;
    } else {
      responseJson.status = response.status;
    }
    setLoading(false);
    return responseJson;
  };
  const setGoogleSign = async (val) => {
    setGoogleSignIn(val);
  };
  return {
    user,
    loading,
    login,
    logout,
    verifyToken,
    googleSignIn,
    setGoogleSign,
    isGoogleSignIn,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
