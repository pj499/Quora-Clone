import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import DisplayQuestion from "./DisplayQuestion.js";
import { useSelector, useDispatch, connect} from "react-redux";
import fetchQuestionsActionFunction from "../actions/index";
import { getQuestionsFromDB } from "../utility";

const Home = (props) => {
  //useSelector is used to extract data from the store
  const questions = useSelector((state) => state.fetchQuestions);
  const dispatch = useDispatch();

  useEffect(() => {
    let q;
    async function getQues(){
      q= await getQuestionsFromDB();
      //dispatch is used to to trigger actions
      dispatch(fetchQuestionsActionFunction(q));
    }
    
    getQues();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        {questions.length > 0
          ? questions.map((question) => <DisplayQuestion question={question} handleIsAddAnswer={props.handleIsAddAnswer} key={question._id} handleSelectedQuestion={props.handleSelectedQuestion}/>)
          : "No Questions"}
      </div>
    </div>
  );
};




export default Home;
