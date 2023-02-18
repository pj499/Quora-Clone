import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DisplayQuestion } from "./index";

const UserQuestions = (props) => {
  let { userId } = useParams();
  const [questions, setQuestions] = useState([]);

  const fetchUserProfileInfo = async () => {
    const url = `http://localhost:8000/${userId}/userProfileQuestions`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const response2 = await response.json();
    console.log("fetchUserProfileInfo", response2);

    if (response.status === 200) {
      setQuestions(response2.data.questions);
    }
    if (response.status === 409) {
    }
  };

  useEffect(() => {
    fetchUserProfileInfo();
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
          : "No Questions"}
      </div>
    </>
  );
};

export default UserQuestions;
