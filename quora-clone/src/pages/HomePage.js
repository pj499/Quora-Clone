import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify'
import { useAuth } from "../hooks";

function HomePage() {


  const [temp, setTemp] = useState('')
  const auth = useAuth();
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

  const handleLogout = async (e) => {
    e.preventDefault();
    let response =await auth.logout();
    console.log("handlelogout",response)
    if (response.status == 200) {
      toast.success("User logged out!", toastInfo);
      navigate('/')
      return;
    }else{
      toast.error("Error in logging out user.",toastInfo)
    }
  }
  useEffect(() => {
    console.log(auth)
    const verifyUser = async () => {
      let verifyToken =await  auth.verifyToken();
      if(verifyToken.status!=200){
        console.log("User logged out")
        await auth.logout();
        toast.info("User Logged Out", toastInfo);
        navigate('/')
      }
    }
    verifyUser();
  })

  if (auth.loading) {
    return <h1>Wait for cutesss!!</h1>
  } else {
    return (
      <div>
        <h1>{auth.user.email}</h1>


        <form onSubmit={handleLogout}>
          <input type='text' onChange={(e) => setTemp(e.target.value)}></input>
          <button type="submit">Logout</button>
        </form>

      </div>
    );
  }
}

export default HomePage;