import signUpStyles from "../styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay, faImage } from "@fortawesome/free-solid-svg-icons";
import signinStyles from "../styles/Signin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/AddQuestion.module.css";
import { useAuth } from "../hooks";
import { useSelector, useDispatch, connect } from "react-redux";
import fetchQuestionsActionFunction from "../actions/index";
import { getQuestionsFromDB } from "../utility";

function AddAnswer(props) {
  const [addAnswerBox, setAddAnswerBox] = useState(true);
  const [answer, setAnswer] = useState("");
  const [isAddAnswer, setIsAddAnswer] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();
  var toastInfo = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleTextarea = ({ target }) => {
    target.style.height = 0;
    target.style.height = Math.min(target.scrollHeight, 180) + "px";
  };

  function handleAnswer(ans) {
    setAnswer(ans);
    if (answer.length > 0) {
      setIsAddAnswer(true);
    } else {
      setIsAddAnswer(false);
    }
  }

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/addAnswer";
    const dataToSubmit = {
      answerOfQuestion: props.selectedQuestion,
      answer,
      answeredBy: auth.user.email,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    console.log("response in add Ans", response);
    if (response.status == 200) {
      let q = await getQuestionsFromDB();
      dispatch(fetchQuestionsActionFunction(q));

      toast.success("Answer Added Successfully!", toastInfo);
      props.handleAddAnswerClose();
    } else if (response.status == 400) {
      toast.error("Cannot add answer, try again!", toastInfo);
    }
  };

  useEffect(() => {
    handleAnswer(answer);
  }, [answer, isAddAnswer]);

  return (
    <>
      <div className={signUpStyles.signUpContainer}></div>
      <div
        className={signUpStyles.signUpBox}
        style={{ width: "48%", height: "430px", left: "25%" }}
      >
        <button
          className={signUpStyles.signupCloseButton}
          onClick={props.handleAddAnswerClose}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className={signUpStyles.signUpInfo}>
          <form
            action=""
            method="post"
            style={{ width: "100%", height: "350px" }}
            onSubmit={handleAnswerSubmit}
          >
            <div className={styles.addQuestionContent}>
              <div className={styles.profileInfo}>
                <img
                  src={auth.user.avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50px",
                  }}
                ></img>
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{
                    paddingLeft: "10px",
                    color: "#636466",
                    fontSize: "10px",
                  }}
                />
              </div>
              <div className={styles.showQuestionDiv}>
                <h4 style={{ margin: "0px" }}>
                  {props.selectedQuestion.question}
                </h4>
              </div>
              <textarea
                className={styles.createPostBoxTextarea}
                onChange={(e) => {
                  handleAnswer(e.target.value);
                  handleTextarea(e);
                }}
                placeholder="Say something..."
              ></textarea>
            </div>

            <div
              style={{
                width: "100%",
                borderBottom: "1px solid lightGray",
              }}
            ></div>

            <FontAwesomeIcon
              icon={faImage}
              size="lg"
              style={{
                position: "relative",
                right: "0%",
                paddingLeft: "10px",
                color: "#636466",
                cursor: "pointer",
              }}
            />
            <button
              type="submit"
              className={signinStyles.formLoginButton}
              disabled={!isAddAnswer}
              style={{
                width: "15%",
                height: "12%",
                marginTop: "12px",
                position: "relative",
                left: "75%",
              }}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAnswer;
