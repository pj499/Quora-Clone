import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify'
import {Home, Following, Answer, Spaces, Notifications} from "../componets/index.js";
import Navbar from "../componets/Navbar.js";
import { useAuth } from "../hooks";


function HomePage() {
  var initialClickState={
    home: true,
    following: false,
    answer: false,
    spaces: false,
    notifications: false
  }
  
  const [clickState, setClickState]= useState(initialClickState);

  const handleClick={
    homeClick: function handleHomeClick(){
      setClickState(clickState=> ({...initialClickState, home:true}))
    },
    followingClick: function handleFollowingClick(){
      setClickState(clickState=> ({...initialClickState, home:false, following:true}))
    },
    answerClick: function handleAnswerClick(){
      setClickState(clickState=> ({...initialClickState, home:false, answer:true}))
    },
    spacesClick: function handleSpacesClick(){
      setClickState(clickState=> ({...initialClickState, home:false, spaces:true}))
    },
    notificationsClick: function handleNotificationsClick(){
      setClickState(clickState=> ({...initialClickState, home:false, notifications:true}))
    }
  }
  
  const auth = useAuth();
  let navigate = useNavigate();
  var toastInfo = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    let response =await auth.logout();
    console.log("handlelogout",response)
    if (response.status == 200) {
      toast.success("User logged out!", toastInfo);
      navigate('/')
      return;
    }else{
      toast.error("Error in logging out user.",toastInfo)
    }
  }

  useEffect(() => {
    const verifyUser = async () => {
      let verifyToken =await auth.verifyToken();
      if(verifyToken.status!=200){
        console.log("User logged out")
        navigate('/')
        // await auth.logout();
        toast.info("Session Expired. Please login again.", toastInfo);
      }
    }
    if(auth.user){
      verifyUser();
    }
  }, [])

  if (!auth.user || auth.loading) {
    return <h1>Wait for cutesss!!</h1>
  } else {
    {console.log('auth user',auth.user)}
    return (

      <div style={{overflowX:"hidden",height:"99vh"}}>
        <Navbar onClick={handleClick} clickState={clickState}/>

        {clickState.home && <Home/>}
        {clickState.following && <Following/>}
        {clickState.answer && <Answer/>}
        {clickState.spaces && <Spaces/>}
        {clickState.notifications && <Notifications/>}

        <form onSubmit={handleLogout}>
          <input type='text'></input>
          <button type="submit">Logout</button>
        </form>

      </div>
    );
  }
}

export default HomePage;