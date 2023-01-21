import signUpStyles from "../styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay, faImage } from "@fortawesome/free-solid-svg-icons";
import signinStyles from "../styles/Signin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/AddQuestion.module.css";
import { useAuth } from "../hooks";
import { fetchingQuestions } from "../utility";

function AddQuestion(props) {
  const [addQuestionBox, setAddQuestionBox] = useState(true);
  const [createPostBox, setCreatePostBox] = useState(false);
  const [question, setQuestion] = useState("");
  const [isAddQuestion, setIsAddQuestion] = useState(false);

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

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/addQuestion";
    const dataToSubmit = {
      question: question,
      askedByEmail: auth.user.email,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    console.log("response in add Q", response);
    if(response.status==200){
      let questions= await fetchingQuestions();
      console.log("questions in add question: ",questions);
      props.fetchQuestions = questions.questions;
      
      toast.success('Question Added Successfully!', toastInfo)
      props.handleAddQuestionClose();
    }else if(response.status==400){
      toast.error('Cannot add question, try again!', toastInfo)
    }
  };

  function handleQuestion(ques) {
    if (ques.length > 0) {
      setIsAddQuestion(true);
    } else {
      setIsAddQuestion(false);
    }
  }

  useEffect(() => {
    handleQuestion(question);
  }, [question, isAddQuestion]);

  return (
    <>
      <div className={signUpStyles.signUpContainer}></div>
      <div
        className={signUpStyles.signUpBox}
        style={{ width: "48%", height: "430px", left: "25%" }}
      >
        <button
          className={signUpStyles.signupCloseButton}
          onClick={props.handleAddQuestionClose}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className={signUpStyles.signUpInfo}>
          <div className={styles.choiceButtons}>
            <div
              onClick={() => {
                setAddQuestionBox(true);
                setCreatePostBox(false);
              }}
              className={
                addQuestionBox ? styles.choiceDivSelected : styles.choiceDiv
              }
            >
              Add Question
            </div>
            <div
              onClick={() => {
                setCreatePostBox(true);
                setAddQuestionBox(false);
              }}
              className={
                createPostBox ? styles.choiceDivSelected : styles.choiceDiv
              }
            >
              Create Post
            </div>
          </div>

          {addQuestionBox && (
            <form
              action=""
              method="post"
              style={{ width: "100%", height: "350px" }}
              onSubmit={handleQuestionSubmit}
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
                <textarea
                  className={styles.addQuestionContentTextarea}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    handleTextarea(e);
                  }}
                  placeholder='Start your question with "What", "How", "Why", etc.'
                ></textarea>
              </div>

              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightGray",
                }}
              ></div>

              <button
                type="submit"
                className={signinStyles.formLoginButton}
                disabled={!isAddQuestion}
                style={{
                  width: "25%",
                  height: "12%",
                  marginTop: "12px",
                  position: "relative",
                  left: "35%",
                }}
              >
                Add Question
              </button>
            </form>
          )}

          {createPostBox && (
            <form
              action=""
              method="post"
              style={{ width: "100%", height: "350px" }}
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
                  <h6
                    style={{
                      paddingLeft: "10px",
                      fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                    }}
                  >
                    {auth.user.name}
                  </h6>
                </div>
                <textarea
                  className={styles.createPostBoxTextarea}
                  onChange={handleTextarea}
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
                  left: "-40%",
                  paddingLeft: "10px",
                  color: "#636466",
                  cursor: "pointer",
                }}
              />
              <button
                type="submit"
                className={signinStyles.formLoginButton}
                disabled={!goNext}
                style={{
                  width: "15%",
                  height: "12%",
                  marginTop: "12px",
                  position: "relative",
                  left: "35%",
                }}
              >
                Post
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(fetchQuestions)
});
export default connect(mapStateToProps,mapDispatchToProps)(AddQuestion);
