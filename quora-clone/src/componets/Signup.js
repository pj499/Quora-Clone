import styles from "../styles/signup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import signinStyles from "../styles/Signin.module.css";
import { useState, useEffect } from "react";
import validator from 'validator';
import {toast} from 'react-toastify'

function SignUp(props) {
  const [goNext, setGoNext]= useState(false);
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [isEmailValid, setIsEmailValid]= useState(true);
  const [isNameValid, setIsNameValid]= useState(true);
  const [isNameBlank, setIsNameBlank]= useState(true);
  const [isEmailBlank, setIsEmailBlank]= useState(true);

  async function handleName(name){
    setName(name);
    if(name.length >=3 && /^[A-Za-z]*$/.test(name)){
      setIsNameValid(true);
      setIsNameBlank(false)
    }else{
      setIsNameValid(false);
      setIsNameBlank(false)
    }
    if(name.length===0)
      setIsNameBlank(true);

    if(isEmailValid && isNameValid && !isNameBlank && !isEmailBlank){
      setGoNext(true);
    }else{
      setGoNext(false);
    }
  }
  function handleEmail(email){
    setEmail(email);
    if(validator.isEmail(email)){
      setIsEmailValid(true);
      setIsEmailBlank(false);
    }else{
      setIsEmailValid(false);
      setIsEmailBlank(false);
    }

    if(email.length===0)
      setIsEmailBlank(true);

    if(isEmailValid && isNameValid && !isNameBlank && !isEmailBlank){
      setGoNext(true);
    }else{
      setGoNext(false);
    }
  } 

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const url= 'http://localhost:8000/sendVerificationMail';
    const dataToSubmit={
      name: name,
      email: email
    }
    const response= await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit)
    })
    const response2= await response.json();

    if(response.status== 200){
      localStorage.setItem('userId', response2.userId);
      props.onNextClick();
    }
    if(response.status== 409){
      toast.error('Email already exist!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        e.target[1].value="";
    }
  }

  useEffect(() => {
    // console.log("rendered")
    handleName(name);
    handleEmail(email);
  }, [name, email, isEmailValid, isNameValid,goNext,isEmailBlank, isNameBlank])
  

  return (
    <>
      <div className={styles.signUpContainer}></div>
      <div className={styles.signUpBox}>
        <button
          className={styles.signupCloseButton}
          onClick={props.onSignUpClose}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className={styles.signUpInfo} >
          <h3
            style={{ fontSize: "18px", fontWeight: "1000", lineHeight: "25px" }}
          >
            Sign up
          </h3>

          <form action='' method="post"  style={{width: '100%'}} onSubmit={handleSubmit}>
            <div className={signinStyles.formInputDiv} style={{width: '90%'}}>
              <label>
                <h5 className={signinStyles.formLabel}>Name</h5>
              </label>
              <input
                type="text" name="name"
                placeholder="What would you like to be called?"
                className={(!isNameValid && !isNameBlank)? styles.invalidInputError :signinStyles.formInput}
                style={{width: '100%'}}
                onChange={(e)=> handleName(e.target.value)}
              ></input>
              {(!isNameValid && !isNameBlank)? <div className={styles.invalidInputBox}>
             Minimum name length should be 3.
              </div> :null}
            </div>

            <div className={signinStyles.formInputDiv} style={{width: '90%'}}>
              <label>
                <h5 className={signinStyles.formLabel}>Email</h5>
              </label>
              <input
                type="email" name="email"
                placeholder="Your email"
                className={(!isEmailValid && !isEmailBlank)?  styles.invalidInputError: signinStyles.formInput}
                style={{width: '100%'}}
                onChange={(e)=> handleEmail(e.target.value)}
              ></input>
             {(!isEmailValid && !isEmailBlank)? <div className={styles.invalidInputBox}>
             The email address you entered is not valid.
              </div> :null}
            </div>

            <div style={{ width: '100%', borderBottom: '1px solid lightGray', marginTop: '35px'}}>

            </div>
            <button  type="submit" className={signinStyles.formLoginButton} disabled={!goNext}
            style={{width: '15%', marginTop: '10px', position: 'relative', left: '40%'}}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
