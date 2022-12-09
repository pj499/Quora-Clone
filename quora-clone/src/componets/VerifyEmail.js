import React from 'react'
import signinStyles from "../styles/Signin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "../styles/signup.module.css";
import {toast} from 'react-toastify'

const VerifyEmail = (props) => {

  const [otp, setOtp] = useState("");
  const [isSubmit, setIsSubmit]= useState(false);
  const [isOTPValid, setIsOTPValid]= useState(false);
  const [isOTPBlank, setIsOTPBlank]= useState(true);
  const [otpValidMessage, setOtpValidMessage] = useState("");
  var toastInfo= {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    };

  
  function handleOtp(otp){
    setOtp(otp);

    if(otp.match('^[0-9]*$') && otp.length==6){
      setOtpValidMessage("")
      setIsSubmit(true);
      setIsOTPValid(true);
      setIsOTPBlank(false);
    }else{
      if(otp.match('^[0-9]*$'))
        setOtpValidMessage("OTP length should be 6.")
      else{
        setOtpValidMessage("OTP must contain digits only.")
      }
        
      setIsSubmit(false);
      setIsOTPValid(false);
      if(otp.length==0)
        setIsOTPBlank(true);
    }

    if(isOTPValid && !isOTPBlank){
      setIsSubmit(true)
    }else{
      setIsSubmit(false)
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const url= 'http://localhost:8000/verifyOtp';
    const dataToSubmit={
      userId: localStorage.getItem('userId'),
      otp: otp
    }
    const response= await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit)
    })
    
    if(response.status== 200){
      toast.success('Email is verified successfully!', toastInfo)
      props.onNextClick();
    }
    if(response.status== 401){
      setIsSubmit(false)
      toast.warning('OTP has been expired! Please click on Resend code', toastInfo)
      e.target[0].value="";
    }
    if(response.status== 404){
      setIsSubmit(false)
      toast.error('Incorrect OTP!', toastInfo);
      e.target[0].value="";
    }
  }
  
  useEffect(() => {
    handleOtp(otp);
  }, [otp,isSubmit])
  
  return (
    <>
    <div className={styles.signUpContainer}></div>
      <div className={styles.signUpBox}>
        <button
          className={styles.signupCloseButton}
          onClick={props.onClose}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className={styles.signUpInfo} >
          <h3
            style={{ fontSize: "20px", fontWeight: "600", lineHeight: "25px" }}
          >
            Confirm your email
          </h3>

          <form action="" method="" style={{width: '100%'}} onSubmit={handleSubmit}>
            <div className={signinStyles.formInputDiv} style={{width: '90%', height:"100px"}}>
              <label>
                <p className={signinStyles.formLabel}>Please enter the code we sent to</p>
              </label>
              <input
                type="text"
                className={(!isOTPValid && !isOTPBlank)? styles.invalidInputError :signinStyles.formInput}
                style={{width: '100%', marginTop:'10px'}}
                onChange={(e)=> handleOtp(e.target.value)}
              ></input>
              {(!isOTPBlank || (otp.length<6 && otp.length>0))? <div className={styles.invalidInputBox}>
             {otpValidMessage}
              </div> :null}
            </div>
            <p style={{textAlign: 'left', fontSize:'smaller', marginTop:'20px'}}>Didn't receive an email or something went wrong? &nbsp;
            <a href='' className={styles.resendotp} >Resend code</a>
            </p>

            <div style={{ width: '100%', borderBottom: '1px solid lightGray', marginTop: '90px'}}>

            </div>
            <button type="submit" className={signinStyles.formLoginButton} disabled={!isSubmit}
            style={{width: '15%', marginTop: '10px', position: 'relative', left: '40%'}}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default VerifyEmail