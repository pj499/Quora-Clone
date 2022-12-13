import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify'
import { useAuth } from "../hooks";

function HomePage() {


  const [temp, setTemp] = useState('')
  const auth = useAuth();
  console.log("auth in home:", auth)
  let navigate = useNavigate();
  var toastInfo = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  // const handleTest = async (e) => {
  //   e.preventDefault();

  //   const url = 'http://localhost:8000/test';
  //   const dataToSubmit = {
  //     temp: temp
  //   }
  //   let response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json",
  //       accessToken: localStorage.getItem('access-token'),
  //     },
  //     withCredentials: true,
  //     body: JSON.stringify(dataToSubmit)
  //   })
  //   let responseJSON = await response.json();
  //   if (response.status == 200) {
  //     toast.success("Test successful!", toastInfo);
  //   }
  //   if (response.status == 401) {
  //     toast.error('User Logged Out', toastInfo);
  //     navigate('/');
  //   }
  // }
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate('/');
    }
  },[])
  if (!auth.isLoggedIn) {
    console.log("User logged out")
    toast.info("User Logged Out", toastInfo);
  }
  if (auth.loading) {
    return <h1>Wait for cutesss!!</h1>
  } else {
    return (
      <div>
        <h1>{auth.user.email}</h1>


        <form >
          <input type='text' onChange={(e) => setTemp(e.target.value)}></input>
          <button type="submit">Test</button>
        </form>

      </div>
    );
  }
}

export default HomePage;