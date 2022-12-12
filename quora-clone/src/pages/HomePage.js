import React from "react";
import { useState } from "react";
import {toast} from 'react-toastify'

function HomePage(){


    const [temp, setTemp] = useState('')
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
    
        console.log(localStorage.getItem('access-token'))
        const url = 'http://localhost:8000/test';
        const dataToSubmit = {
          temp: temp
        }
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-type": "application/json",
            accessToken: localStorage.getItem('access-token'),
            refreshToken: localStorage.getItem('refresh-token')
          },
          body: JSON.stringify(dataToSubmit)
        })
        
        let responseJSON= await response.json();
        localStorage.setItem('access-token', responseJSON.accessToken)
        if(response.status==200){
          toast.success("Test successful!",toastInfo);
        }else{
          toast.error("Invalid test!",toastInfo);
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