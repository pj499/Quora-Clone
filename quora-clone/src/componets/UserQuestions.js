import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DisplayQuestion } from "./index";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

const UserQuestions = (props) => {
  let { userId } = useParams();
  // const [allQuestions, setAllQuestions] = useState(useSelector((state) => state.fetchQuestions))
  // const [questions, setQuestions] = useState([]);
  const questions = useSelector((state) => {
    const allQ = state.fetchQuestions;
    return allQ.filter((item) => item.askedBy == userId);
  });


  // const fetchUserProfileInfo = async () => {
  //   const url = `http://localhost:8000/${userId}/userProfileQuestions`;

  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  //   const response2 = await response.json();
  //   console.log("fetchUserProfileInfo", response2);

  //   if (response.status === 200) {
  //     setQuestions(response2.data.questions);
  //   }
  //   if (response.status === 409) {
  //   }
  // };

  useEffect(() => {
    // fetchUserProfileInfo();
    // setQuestions(allQuestions.filter((item) => item.askedBy == userId));
    // questions= allQuestions.filter((item) => item.askedBy == userId)
    // console.log("Q", allQuestions);
  }, []);

  return (
    <>
      <div>
        {questions.length > 0
          ? questions.map((question) => (
              <DisplayQuestion
                question={question}
                handleIsAddAnswer={props.handleIsAddAnswer}
                key={question._id}
                handleSelectedQuestion={props.handleSelectedQuestion}
              />
            ))
          : "No Questions"
            // <div
            //   style={{
            //     margin: "auto",
            //     position: "absolute",
            //     top: "30%",
            //     left: "45%",
            //   }}
            // >
            //   <RotatingLines
            //     strokeColor="#a82723"
            //     strokeWidth="5"
            //     animationDuration="0.75"
            //     width="70"
            //     visible={true}
            //   />
            // </div>
        }
      </div>
    </>
  );
};

export default UserQuestions;
