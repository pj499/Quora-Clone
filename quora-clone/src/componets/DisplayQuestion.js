import React, { useEffect, useState } from "react";
import styles from "../styles/DisplayQuestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComment, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";
import DisplayAnswer from "./DisplayAnswer.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const DisplayQuestion = (props) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  let d= new Date(props.question.createdAt);
  let questionYear= d.getFullYear();
  let questionMonth= monthNames[d.getMonth()];
  let questionDate= d.getDate();
  const navigate= useNavigate()

  const handleUserProfilePage= ()=>{
    navigate(`/userProfile/${props.question.askedBy}`)
  }

  const [answerCounter, setAnswerCounter] = useState(1);
  useEffect(() => {
  }, [answerCounter, props.isUserProfilePage])

  return (
    <>
      <div className={styles.questionContainer}>
        <div className={styles.profileInfo}>
          <img
            src={props.question.askedByAvatar}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "50px",
            }}
          ></img>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <h6 className={styles.userName} onClick={()=> props.setIsUserProfilePage(true)}
              style={{
                paddingLeft: "10px",
                paddingTop: "5px",
                fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                margin: 0
              }}
            >
              {props.question.askedByName}
            </h6>
            <pre style={{margin: 0, fontSize: 'smaller', paddingLeft: '10px'}}>{questionDate} {questionMonth} {questionYear}</pre>
          </div>
          

        </div>
        <h2 className={styles.questionHeading}>{props.question.question}</h2>
        <div className={styles.questionActions}>
          <button
            className={styles.answerButton}
            onClick={() => { props.handleIsAddAnswer(); props.handleSelectedQuestion(props.question) }}
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
        {props.question.answers.length > 0 ? props.question.answers.slice(0, answerCounter).map((answer) =>
          <DisplayAnswer answer={answer} key={answer._id} />
        ) : "No Answers"}
        {answerCounter < props.question.answers.length  && <div className={styles.loadAnswers}>
          <FontAwesomeIcon onClick={()=>setAnswerCounter(answerCounter+1)}
            icon={faCirclePlus}
            size="lg"
            color="#DBD9D9"
            style={{ paddingTop: "5px",cursor:"pointer" }}
            className={styles.loadAnswerButton}
          />
        </div>}
      </div>


    </>
  );
};

export default DisplayQuestion;
