import signUpStyles from "../styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlay, faImage } from "@fortawesome/free-solid-svg-icons";
import signinStyles from "../styles/Signin.module.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/AddQuestion.module.css";
import { useAuth } from "../hooks";

function AddQuestion(props) {
  const [goNext, setGoNext] = useState(false);
  const [addQuestionBox, setAddQuestionBox] = useState(true);
  const [createPostBox, setCreatePostBox] = useState(false);

  const auth = useAuth();

  const handleSubmit = async (e) => {};
  const handleTextarea= ({target}) =>{
    target.style.height = 0;
    target.style.height = Math.min(target.scrollHeight ,180) + 'px';    
  }

  useEffect(() => {
  }, []);

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
              style={{ width: "100%", height: "350px"}}
            >
              <div className={styles.addQuestionContent}>
                <div className={styles.profileInfo}>
                    <img src={auth.user.avatar} alt=""
                                referrerpolicy="no-referrer"
                                style={{ width: '25px', height: '25px', borderRadius: '50px' }}
                        >
                    </img>
                    <FontAwesomeIcon icon={faPlay}style={{paddingLeft: '10px', color: '#636466', fontSize:'10px'}}/>
                </div>
                <textarea className={styles.addQuestionContentTextarea} onChange={handleTextarea}
                placeholder='Start your question with "What", "How", "Why", etc.'>
                    
                </textarea>
              </div>

              <div
                style={{
                  width: "100%",
                  borderBottom: "1px solid lightGray"
                }}
              ></div>

              <button
                type="sbumit"
                className={signinStyles.formLoginButton}
                disabled={!goNext}
                style={{
                  width: "25%",
                  height: '12%',
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
            style={{ width: "100%", height: "350px"}}
          >
            <div className={styles.addQuestionContent}>
              <div className={styles.profileInfo}>
                  <img src={auth.user.avatar} alt=""
                              referrerpolicy="no-referrer"
                              style={{ width: '25px', height: '25px', borderRadius: '50px' }}
                      >
                  </img>
                  <h6 style={{paddingLeft: '10px', fontFamily:"Cantarell, Helvetica Neue, sans-serif"}}>{auth.user.name}</h6>
              </div>
              <textarea className={styles.createPostBoxTextarea} onChange={handleTextarea}
              placeholder='Say something...'>
                  
              </textarea>
            </div>

            <div
              style={{
                width: "100%",
                borderBottom: "1px solid lightGray"
              }}
            ></div>
            
            
            <FontAwesomeIcon icon={faImage} size='lg' style={{position: "relative",left:'-40%', paddingLeft: '10px', color: '#636466', cursor:'pointer'}}/>
            <button
              type="sbumit"
              className={signinStyles.formLoginButton}
              disabled={!goNext}
              style={{
                width: "15%",
                height: '12%',
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

export default AddQuestion;
