import React, { useState, useEffect } from 'react'
import { UserProfileAnswers } from './index'
import styles from '../styles/UserAnswers.module.css'
import { useParams } from 'react-router'
import { RotatingLines } from 'react-loader-spinner'
const UserAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  let { userId } = useParams();

  const fetchUserAnswers = async () => {
    const url = `http://localhost:8000/${userId}/userProfileAnswers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const response2 = await response.json();
    // console.log("getUserProfileAnswers", response2);
    if (response.status === 200) {
      setAnswers(response2.answers);
      setUserInfo(response2.userInfo)
    }
    if (response.status === 409) {
    }
  };

  useEffect(() => {
    setLoading(true);
    async function getAnswers() {
      await fetchUserAnswers();
      setLoading(false);
    }
    getAnswers();
  }, [])

  return (
    <>
      <div className={styles.userAnswersContainer}>
        {loading ? (
          <div style={{ margin: 'auto', position: "absolute", top: "30%", left: "45%" }}>
            <RotatingLines
              strokeColor="#a82723"
              strokeWidth="5"
              animationDuration="0.75"
              width="70"
              visible={true}
            />
          </div>
        ) : answers.length > 0 ? answers.map((answer)=><UserProfileAnswers answer={answer} userInfo={userInfo}/>) : 'No Answers'
        }
      </div>
    </>
  )
}

export default UserAnswers