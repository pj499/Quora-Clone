import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import DisplayQuestion from './DisplayQuestion.js'
import {connect} from 'react-redux'

const Home = (props) => {
  const [questions,setQuestions]=useState([]);

  async function fetchingQuestions() {
    const url = "http://localhost:8000/fetchQuestions";
    var response = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
      },
    }
    )
    var response2 = await response.json();
    setQuestions(response2.questions);
    console.log("response: ", questions)
  }


  useEffect(() => {
    fetchingQuestions();
  },[])
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        {questions.length > 0 ? questions.map((question) => {
          <DisplayQuestion handleIsAddAnswer={props.handleIsAddAnswer} />
        }) : "No Questions"
        }

      </div>
    </div>

  )
}

export default connect()(Home)