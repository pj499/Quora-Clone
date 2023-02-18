import React, { useEffect, useState } from "react";
import styles from "../styles/UserProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams, Outlet } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

function UserProfile() {
  const navigate = useNavigate();
  let { userId } = useParams();
  let location = useLocation();
  let parameters = location.pathname.split("/");
  const [userInfo, setUserInfo] = useState({});
  const [isProfileLoading, setIsProfileLoading] = useState(true);

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

  useEffect(() => {
    setIsProfileLoading(true);

    async function get() {
      await getUserProfileHeaderInfo();
      setIsProfileLoading(false);
      console.log("ARrayss useEffect", userInfo.followers, userInfo.following);
      console.log("UserINfo", userInfo);
      console.log("loading", isProfileLoading);
    }
    get();
  }, []);

  return (
    <>
      {isProfileLoading ? (
        <RotatingLines
          strokeColor="#a82723"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true}
          style={{position: 'relative', top:'50%', left: '500px'}}
        />
      ) : (
        <div className={styles.profileContainer}>
          <div className={styles.userProfileInfo}>
            <img src={userInfo.avatar} className={styles.profileImg} />
            <div className={styles.userInfo}>
              <h2 style={{ color: "#282829", lineHeight: "35px", margin: "0" }}>
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
              <button className={styles.followButton}>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  size="sm"
                  color="#DBD9D9"
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
                  Follow
                </h5>
              </button>
            </div>
          </div>

          <div className={styles.userActivitySelection}>
            <Link
              to={`/userProfile/${userId}/questions`}
              className={styles.eachUserActivity}
              style={{
                borderBottom:
                  parameters[3] === "questions" ? "4px solid #a82723" : "none",
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
              to={`/userProfile/${userId}/followers`}
              className={styles.eachUserActivity}
              style={{
                borderBottom:
                  parameters[3] === "followers" ? "4px solid #a82723" : "none",
              }}
            >
              <h5 style={{ margin: "0" }}>Followers</h5>
            </Link>
            <Link
              to={`/userProfile/${userId}/following`}
              className={styles.eachUserActivity}
              style={{
                borderBottom:
                  parameters[3] === "following" ? "4px solid #a82723" : "none",
              }}
            >
              <h5 style={{ margin: "0" }}>Following</h5>
            </Link>
          </div>

          <Outlet />
        </div>
      )}
    </>
  );
}

export default UserProfile;
