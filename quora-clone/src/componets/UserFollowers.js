import React from 'react'
import {EachUser} from './index'
import styles from '../styles/UserFollowers.module.css'
import {useParams} from 'react-router';
import {useLocation} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { RotatingLines } from "react-loader-spinner";

const UserFollowers = () => {
  const [followers,setFollowers]=useState([]);
  const [loading,setLoading]=useState(true);
  const {userId} = useParams();
  let location = useLocation();
  console.log("location.state",location.state);
  let userFriends = location.pathname.split("/").at(-1);
  console.log("userFriends",userFriends)
  const fetchUserFollowers = async ()=>{
    setLoading(true);
    let url = `http://localhost:8000/${userId}/${userFriends}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    let response2 = await response.json();
    if(response.status==200){
      setFollowers(response2.userFollowerDetails);
      setLoading(false);
    }
  }

  useEffect(()=>{
    let getFollowers=async()=>{
      await fetchUserFollowers();
    }
    getFollowers();
  },[location])
  return (
    <div className={styles.userFollowersContainer}>
      {loading && <div style={{ margin: 'auto',position: "absolute", top: "30%", left: "45%" }}>
          <RotatingLines
            strokeColor="#a82723"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
          </div>}
      <div className={styles.followersCount}>
        <p style={{margin:'0px',fontSize:'18px',fontWeight:'bold'}}>{followers.length} {`${userFriends}`}</p>
      </div>
      {followers.map((follower)=> <EachUser follower={follower}/>)}
    </div>
  )
}

export default UserFollowers