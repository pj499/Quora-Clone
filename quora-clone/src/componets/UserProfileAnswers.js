import React, { useState } from 'react'
import styles from '../styles/UserProfileAnswers.module.css'
import styles2 from '../styles/DisplayQuestion.module.css'
import styles3 from '../styles/DisplayAnswer.module.css'

const UserProfileAnswers = (props) => {
    const [showmore, setShowmore] = useState(false)
    let text = props.answer.answer
    let userInfo = props.userInfo;
    let userAvatar = userInfo.avatar;
    let userName = userInfo.name;
    return (
        <div className={styles.userProfileAnswersContainer}>
            <div className={styles2.profileInfo}>
                <img
                    src={userAvatar}
                    alt=""
                    referrerPolicy="no-referrer"
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50px",
                        cursor: "pointer"
                    }}
                ></img>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h6 className={styles2.userName}
                        style={{
                            paddingLeft: "10px",
                            paddingTop: "5px",
                            fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                            margin: 0,
                            fontSize: '15px'
                        }}
                    >
                        {userName}
                    </h6>
                </div>
            </div>
            <div className={styles.questionDiv}>
                <h3 style={{ wordSpacing: '3px' }}>{props.answer.answerOfQuestion.question}</h3>
            </div>
            <div className={styles.userAnswer}>
                {text.length < 100 ? text : (showmore ? text : text.substring(0, 100) + "....")}

                {text.length > 100 && (
                    <button
                        onClick={() => {
                            setShowmore(!showmore);
                        }}
                        className={styles3.showMoreButton}
                    >
                        {showmore ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserProfileAnswers