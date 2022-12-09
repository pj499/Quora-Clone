import React from 'react'
import signinStyles from "../styles/Signin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEyeSlash, faEye  } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "../styles/signup.module.css";
import {toast} from 'react-toastify'
import PasswordChecklist from 'react-password-checklist';

const Password = (props) => {
  const [isSubmit, setIsSubmit]= useState(false);
  const [isPasswordValid, setIsPasswordValid]= useState(false);
  const [isPasswordBlank, setIsPasswordBlank]= useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('')

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

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const url= 'http://localhost:8000/setPassword';
    const dataToSubmit={
      userId:localStorage.getItem('userId'),
      password:password
    }
    const response= await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSubmit)
    })
    
    if(response.status== 200){
      toast.success('Account Created successfully! Please login to continue.', toastInfo)
      localStorage.removeItem('userId')
      props.onPasswordClose();
    }
    if(response.status== 400){
      toast.error('Error in creating user! Please try again after sometime.', toastInfo)
      props.onPasswordClose();
    }
  }

  useEffect(() => {
  }, [password, isPasswordValid])
  
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
            Sign up
          </h3>

          <form action="" method="" style={{width: '100%', marginTop: '20px'}} onSubmit={handleSubmit}>
            <div className={signinStyles.formInputDiv} style={{width: '90%', height:"100px"}}>
              <label>
                <p className={signinStyles.formLabel} style={{fontSize: 'small', fontWeight:'bold'}}>Password</p>
              </label>
              <div style={{width: '100%', marginTop:'10px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <input
                    type= {!showPassword? 'password': 'text'}
                    className={(!isPasswordValid && !isPasswordBlank)? styles.invalidInputError :signinStyles.formInput}
                    style={{width: '90%'}}
                    onChange={(e)=>{setPassword(e.target.value); e.target.value==''?setIsPasswordBlank(true):setIsPasswordBlank(false)}}
                ></input>
                {!showPassword && <FontAwesomeIcon icon={faEyeSlash} color='grey' style={{cursor: 'pointer'}} onClick={()=>setShowPassword(true)}/>}
                {showPassword && <FontAwesomeIcon icon={faEye} color='grey' style={{cursor: 'pointer'}} onClick={()=>setShowPassword(false)}/>}
              </div>
              <PasswordChecklist
                style={{fontSize: 'smaller', lineHeight: '8px', textAlign: "left", marginTop:'10px'}}
                iconSize='9'
				rules={["minLength","number","capital", "lowercase"]}
				minLength={8}
				value={password}
				onChange={(isValid) => {setIsPasswordValid(isValid)}}
			/>
            </div>

            <div style={{ width: '100%', borderBottom: '1px solid lightGray', marginTop: '100px'}}>
            </div>
            <button type="submit" className={signinStyles.formLoginButton} disabled={!isPasswordValid}
            style={{width: '15%', marginTop: '10px', position: 'relative', left: '40%', cursor:'pointer'}}
            >
              Finish
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Password