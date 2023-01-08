import React from 'react'
import styles from '../styles/Home.module.css'
import DisplayQuestion from './DisplayQuestion.js'
const Home = (props) => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>

      </div>
      <DisplayQuestion handleIsAddAnswer={props.handleIsAddAnswer}/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
      <DisplayQuestion/>
    </div>

  )
}

export default Home