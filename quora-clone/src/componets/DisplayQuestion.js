import React from "react";
import styles from "../styles/DisplayQuestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComment } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";
import DisplayAnswer from "./DisplayAnswer";

const DisplayQuestion = (props) => {
  return (
    <>
      <div className={styles.questionContainer}>
        <div className={styles.profileInfo}>
          <img
            src="https://i.pinimg.com/originals/46/e7/9a/46e79ad5103cc80833f68c308925fb21.jpg"
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50px",
            }}
          ></img>
          <h6 className={styles.userName}
            style={{
              paddingLeft: "10px",
              paddingTop:"5px",
              fontFamily: "Cantarell, Helvetica Neue, sans-serif",
            }}
          >
            {props.question.askedByName}
          </h6>
        </div>
        <h2 className={styles.questionHeading}>{props.question.question}</h2>
        <div className={styles.questionActions}>
          <button
            className={styles.answerButton}
            onClick={props.handleIsAddAnswer}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg" color="#636466" />
            <p>Answer</p>
          </button>
          <div className={styles.questionComment}>
            <FontAwesomeIcon
              icon={faComment}
              size="lg"
              color="#DBD9D9"
              style={{ paddingTop: "5px" }}
            />
          </div>
        </div>

        <DisplayAnswer />
      </div>

      
    </>
  );
};

export default DisplayQuestion;
