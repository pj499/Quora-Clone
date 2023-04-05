import React from 'react'
import styles from '../styles/EachUser.module.css';
import { faUserPlus,faUserCheck } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router';


const EachUser = ({follower}) => {
  console.log("follower: ",follower);
  const auth = useAuth();
  const navigate = useNavigate();
  const userNameClickHandler=(id)=>{
    navigate(`/userProfile/${id}/questions`)
  }
  return (
    <div className={styles.eachUserContainer}>
        <div className={styles.userInfo}>
            <div className={styles.userImg}>
                <img src={follower.avatar} className={styles.userImage}></img>
            </div>
            <div className={styles.userDetails}>
                <p style={{margin:'0px',padding:'0px',marginBottom:'5px',fontSize:'18px',fontWeight:'bold'}} className={styles.userName} onClick={()=>userNameClickHandler(follower._id)}>{follower.name}</p>
                <pre style={{margin:'0px',padding:'0px',color:'gray'}}>{follower.followers.length} followers</pre>
            </div>
        </div>

        <button className={styles.followUnFollow} style={{display:(auth.user.userId==follower._id||follower.followers.includes(auth.user.userId))?"none":"inline-block"}}>
            <FontAwesomeIcon icon={faUserPlus} size="lg" style={{marginRight:'10px'}}/>
            <h4 style={{display:'inline'}}>Follow</h4>
        </button>
    </div>
  )
}

export default EachUser;