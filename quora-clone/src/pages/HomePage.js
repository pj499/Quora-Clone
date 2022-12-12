import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify'

function HomePage(){


    const [temp, setTemp] = useState('')
    let navigate=useNavigate();
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

    const handleTest = async (e) => {
        e.preventDefault();
    
        const url = 'http://localhost:8000/test';
        const dataToSubmit = {
          temp: temp
        }
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
            accessToken: localStorage.getItem('access-token'),
          },
          withCredentials:true,
          body: JSON.stringify(dataToSubmit)
        })
        let responseJSON= await response.json();
        if(response.status==200){
          toast.success("Test successful!",toastInfo);
        }
        if(response.status==401){
          toast.error('User Logged Out',toastInfo);
          navigate('/');
        }
      }

    return(
        <div>
            <h1>Cutessssssssssssssssssssssssssssssssssssss!</h1>
            

            <form onSubmit={handleTest}>
                <input type='text' onChange={(e)=>setTemp(e.target.value)}></input>
                <button type="submit">Test</button>
            </form>
            
        </div>
    );
}

export default HomePage;