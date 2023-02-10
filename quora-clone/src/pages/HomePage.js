import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import AddQuestion from "../componets/AddQuestion.js";
import AddAnswer from "../componets/AddAnswer";
import {
  Home,
  Following,
  Answer,
  Spaces,
  Notifications,
  UserProfile
} from "../componets/index.js";
import { useAuth } from "../hooks";
import styles from "../styles/HomePage.module.css";

function HomePage(props) {
  var initialClickState = {
    home: true,
    following: false,
    answer: false,
    spaces: false,
    notifications: false,
  };



  // const handleClick = {
  //   homeClick: function handleHomeClick() {
  //     setClickState((clickState) => ({ ...initialClickState, home: true }));
  //   },
  //   followingClick: function handleFollowingClick() {
  //     setClickState((clickState) => ({
  //       ...initialClickState,
  //       home: false,
  //       following: true,
  //     }));
  //   },
  //   answerClick: function handleAnswerClick() {
  //     setClickState((clickState) => ({
  //       ...initialClickState,
  //       home: false,
  //       answer: true,
  //     }));
  //   },
  //   spacesClick: function handleSpacesClick() {
  //     setClickState((clickState) => ({
  //       ...initialClickState,
  //       home: false,
  //       spaces: true,
  //     }));
  //   },
  //   notificationsClick: function handleNotificationsClick() {
  //     setClickState((clickState) => ({
  //       ...initialClickState,
  //       home: false,
  //       notifications: true,
  //     }));
  //   },
  // };

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

  
  useEffect(() => {
    const verifyUser = async () => {
      let verifyToken = await auth.verifyToken();
      if (verifyToken.status != 200) {
        console.log("User logged out");
        navigate("/");
        // await auth.logout();
        toast.info("Session Expired. Please login again.", toastInfo);
      }
    };
    if (auth.user) {
      verifyUser();
    }
  }, []);

  if (!auth.user || auth.loading) {
    return <h1>Wait for cutesss!!</h1>;
  } else {
    return (
      <>
        
        <div className={styles.homepageContainer}>
          <div
            onClick={() => {
              props.setProfileDropDown(false);
            }}
            className={styles.hompagePages}
          >
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
