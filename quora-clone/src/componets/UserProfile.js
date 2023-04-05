import React, { useEffect, useState } from "react";
import styles from "../styles/UserProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams, Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {useAuth} from "../hooks/index"
import { useRef } from "react";

function UserProfile() {
  const navigate = useNavigate();
  let { userId } = useParams();
  
  
  let location = useLocation();
  let parameters = location.pathname.split("/");
  const [userInfo,setUserInfo] = useState({});
  
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const auth = useAuth();


  const getUserProfileHeaderInfo = async () => {
    const url = `http://localhost:8000/${userId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const response2 = await response.json();
    console.log("getUserProfileHeaderInfo", response2.data.user);
    if (response.status === 200) {
      setUserInfo(response2.data.user);
      
    }
    if (response.status === 409) {
    }
  };

  const followUnfollowUser = async ()=>{
    const url = `http://localhost:8000/followUnfollow`;
    let dataToSubmit={
      'whomToFollowUserId':userId,
      'userId':auth.user.userId
    }
    let response = await fetch(url,{
      method:'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });
     
    if(response.status==200){
      let response2 = await response.json();
      setUserInfo(response2.user); 
      // window.location.reload();
    }

  }

  useEffect(() => {
    setIsProfileLoading(true);

    async function get() {
      await getUserProfileHeaderInfo();
      setIsProfileLoading(false);
    }
    get();
  },[location]);

  return (
    <>
      <div className={styles.profileContainer}>
        {isProfileLoading ? (
          <div style={{ margin: 'auto',position: "absolute", top: "30%", left: "45%" }}>
          <RotatingLines
            strokeColor="#a82723"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
          </div>
        ) : (
          <>
            <div className={styles.userProfileInfo}>
              <img src={userInfo.avatar} className={styles.profileImg} />
              <div className={styles.userInfo}>
                <h2
                  style={{ color: "#282829", lineHeight: "35px", margin: "0" }}
                >
                  {userInfo.name}
                </h2>
                <pre
                  style={{
                    color: "#636466",
                    fontSize: "13px",
                    fontFamily: "helvetica",
                  }}
                >
                  {userInfo.followers.length} followers{" "}
                  {userInfo.following.length} following
                </pre>
                {userId!=auth.user.userId && <button className={!userInfo.followers.includes(auth.user.userId)?styles.followButton:styles.followedButton} onClick={followUnfollowUser}>
                  <FontAwesomeIcon
                    icon={!userInfo.followers.includes(auth.user.userId)?faUserPlus: faUserCheck}
                    size="sm"
                    color={!userInfo.followers.includes(auth.user.userId)?"#DBD9D9":"#1a5aff"}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  <h5
                    style={{
                      display: "inline",
                      margin: "0",
                      fontSize: "13px",
                      fontFamily: "sans-serif",
                    }}
                  >
                  {userInfo.followers.includes(auth.user.userId)? "Following" : "Follow"}
                  </h5>
                </button>}
              </div>
            </div>

            <div className={styles.userActivitySelection}>
              <Link
                to={`/userProfile/${userId}/questions`}
                className={styles.eachUserActivity}
                style={{
                  borderBottom:
                    parameters[3] === "questions"
                      ? "4px solid #a82723"
                      : "none",
                }}
              >
                <h5 style={{ margin: "0" }}>Questions</h5>
              </Link>
              <Link
                to={`/userProfile/${userId}/answers`}
                className={styles.eachUserActivity}
                style={{
                  borderBottom:
                    parameters[3] === "answers" ? "4px solid #a82723" : "none",
                }}
              >
                <h5 style={{ margin: "0" }}>Answers</h5>
              </Link>
              <Link
                to={{pathname:`/userProfile/${userId}/followers` ,state:{userInfo}}}
                className={styles.eachUserActivity}
                style={{
                  borderBottom:
                    parameters[3] === "followers"
                      ? "4px solid #a82723"
                      : "none",
                }}
              >
                <h5 style={{ margin: "0" }}>Followers</h5>
              </Link>
              <Link
                to={`/userProfile/${userId}/following`}
                className={styles.eachUserActivity}
                style={{
                  borderBottom:
                    parameters[3] === "following"
                      ? "4px solid #a82723"
                      : "none",
                }}
              >
                <h5 style={{ margin: "0" }}>Following</h5>
              </Link>
            </div>

            <Outlet />
          </>
        )}
      </div>
    </>
  );
}

export default UserProfile;
