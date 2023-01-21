import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import DisplayQuestion from './DisplayQuestion.js'
import { connect } from 'react-redux'

const Home = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  }, [])
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