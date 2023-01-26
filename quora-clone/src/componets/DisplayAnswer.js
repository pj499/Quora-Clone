import React from "react";
import styles from "../styles/DisplayAnswer.module.css";
import questionStyles from "../styles/DisplayQuestion.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComment } from "@fortawesome/free-solid-svg-icons";

const DisplayAnswer = (props) => {
  const [showmore, setShowmore] = useState(false);

  let text = props.answer.answer;

  useEffect(() => {}, [showmore]);

  return (
    <div className={styles.answerContainer}>
      <div className={questionStyles.profileInfo}>
        <img
          src={props.answer.answeredByAvatar}
          alt=""
          referrerPolicy="no-referrer"
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50px",
          }}
        ></img>
        <h6
          style={{
            paddingLeft: "10px",
            fontFamily: "Cantarell, Helvetica Neue, sans-serif",
          }}
        >
          {props.answer.answeredByName}
        </h6>
      </div>

      <div className={styles.answerContent}>
        {text.length < 100 ? text : (showmore ? text : text.substring(0, 100) + "....")}

        {text.length > 100 && (
          <button
            onClick={() => {
              setShowmore(!showmore);
            }}
            className={styles.showMoreButton}
          >
            {showmore ? "Show Less" : "Show More"}
          </button>
        )}
        
      </div>
    </div>
  );
};

export default DisplayAnswer;
