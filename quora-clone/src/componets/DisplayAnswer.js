import React from "react";
import styles from "../styles/DisplayAnswer.module.css";
import questionStyles from "../styles/DisplayQuestion.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const DisplayAnswer = (props) => {
  const [showmore, setShowmore] = useState(false);
  const [liked, setLiked] = useState(false);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  let d= new Date(props.answer.createdAt);
  let answerYear= d.getFullYear();
  let answerMonth= monthNames[d.getMonth()];
  let answerDate= d.getDate();
  const navigate= useNavigate();

  let text = props.answer.answer;

  const handleUserProfilePage= ()=>{
    navigate(`/userProfile/${props.answer.answeredBy}/questions`)
  }

  useEffect(() => {

  }, [showmore]);

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
            cursor:'pointer'
          }}
          onClick={()=> handleUserProfilePage()}
        ></img>
        <div className={styles.nameDate}>
          <h6
            style={{
              // paddingLeft: "10px",
              margin:0,
              fontFamily: "Cantarell, Helvetica Neue, sans-serif",
              cursor:'pointer'
            }}
            onClick={()=> handleUserProfilePage()}
          >
            {props.answer.answeredByName}
          </h6>
          <pre style={{margin:'0',marginTop:'2px',fontSize:'smaller'}}>{answerDate} {answerMonth} {answerYear}</pre>
        </div>
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
      <div className={styles.answerActions}>
        <div className={styles.answerIcon}>
          <FontAwesomeIcon
            icon={faComment}
            size="lg"
            color="#DBD9D9"
            style={{ paddingTop: "5px" }}
          />
        </div>
        <div className={styles.answerIcon} >
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="lg"
            color={liked ? "#81A2F6" : "#DBD9D9"}
            style={{ paddingTop: "5px" }}
            onClick={() => { setLiked(!liked); console.log('liked?', liked); }}
          />
          {/* <pre>0 likes</pre> */}
        </div>
      </div>
    </div>
  );
};

export default DisplayAnswer;
