import "../styles/App.css";
import SignIn from "../pages/SignIn";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/App.module.css";
import { useAuth } from "../hooks";
import { useState, useEffect } from "react";
import {
  Home,
  Following,
  Answer,
  Spaces,
  Notifications,
  UserProfile,
  AddQuestion,
  AddAnswer,
  UserAnswers,
  UserQuestions,
  UserFollowers,
  UserFollowing,
} from "./index";
import Navbar from "./Navbar";

function App() {
  const auth = useAuth();

  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});

  function handleProfileDropDown() {
    setProfileDropDown(!profileDropDown);
  }

  function handleIsAddQuestion() {
    setIsAddQuestion(true);
  }

  function handleIsAddAnswer() {
    setIsAddAnswer(true);
  }

  function handleSelectedQuestion(question) {
    setSelectedQuestion(question);
  }

  function handleAddQuestionClose() {
    setIsAddQuestion(false);
  }

  function handleAddAnswerClose() {
    setIsAddAnswer(false);
  }

  useEffect(() => {}, [isAddQuestion, isAddAnswer, profileDropDown]);

  return (
    <>
      {isAddQuestion && (
        <AddQuestion handleAddQuestionClose={handleAddQuestionClose} />
      )}

      {isAddAnswer && (
        <AddAnswer
          handleAddAnswerClose={handleAddAnswerClose}
          selectedQuestion={selectedQuestion}
        />
      )}
      <div className={styles.appContainer}>
        {auth.user && (
          <Navbar
            profileDropDown={profileDropDown}
            handleProfileDropDown={handleProfileDropDown}
            isAddQuestion={isAddQuestion}
            handleIsAddQuestion={handleIsAddQuestion}
          />
        )}

        <div
          className={styles.hompagePages}
          onClick={() => {
            setProfileDropDown(false);
          }}
        >
          <Routes>
            <Route path="/" element={<SignIn />}></Route>

            <Route path="/userProfile/:userId" element={<UserProfile />}>
              <Route
                path="questions"
                element={
                  <UserQuestions
                  />
                }
              ></Route>
              <Route path="answers" element={<UserAnswers />}></Route>
              <Route path="followers" element={<UserFollowers />}></Route>
              <Route path="following" element={<UserFollowing />}></Route>
            </Route>

            <Route
              path="/home"
              element={
                <Home
                  handleIsAddAnswer={handleIsAddAnswer}
                  handleSelectedQuestion={handleSelectedQuestion}
                />
              }
            ></Route>
            <Route path="/following" element={<Following />}></Route>
            <Route path="/answer" element={<Answer />}></Route>
            <Route path="/spaces" element={<Spaces />}></Route>
            <Route path="/notifications" element={<Notifications />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
