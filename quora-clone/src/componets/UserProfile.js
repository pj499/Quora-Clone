import React, { useState } from "react";
import styles from "../styles/UserProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useNavigate, useParams, Outlet } from "react-router";
import { Link } from "react-router-dom";

import { UserQuestions, UserAnswers } from "./index";

function UserProfile() {
  const navigate = useNavigate();
  let { userId } = useParams();
  let initialUserActivitySelection = {
    questions: true,
    answers: false,
    followers: false,
    following: false,
  };
  const [userActivitySelection, setUserActivitySelection] = useState(
    initialUserActivitySelection
  );

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.userProfileInfo}>
          <div className={styles.profileImg}></div>
          <div className={styles.userInfo}>
            <h2 style={{ color: "#282829", lineHeight: "35px", margin: "0" }}>
              Abhishek Som
            </h2>
            <pre
              style={{
                color: "#636466",
                fontSize: "13px",
                fontFamily: "helvetica",
              }}
            >
              1,167 followers 214 following
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
            onClick={() =>
              setUserActivitySelection(...initialUserActivitySelection)
            }
          >
            <h5 style={{ margin: "0" }}>Questions</h5>
          </Link>
          <Link
            to={`/userProfile/${userId}/answers`}
            className={styles.eachUserActivity}
            onClick={() =>
              setUserActivitySelection(
                ...initialUserActivitySelection,
                (initialUserActivitySelection.questions = false),
                (initialUserActivitySelection.answers = true)
              )
            }
          >
            <h5 style={{ margin: "0" }}>Answers</h5>
          </Link>
          <Link
            to={`/userProfile/${userId}/followers`}
            className={styles.eachUserActivity}
          >
            <h5 style={{ margin: "0" }}>Followers</h5>
          </Link>
          <Link
            to={`/userProfile/${userId}/following`}
            className={styles.eachUserActivity}
          >
            <h5 style={{ margin: "0" }}>Following</h5>
          </Link>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default UserProfile;
