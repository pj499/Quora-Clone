import React from "react";
import styles from "../styles/UserProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function UserProfile() {
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.userProfileInfo}>
          <div className={styles.profileImg}></div>
          <div className={styles.userInfo}>
            <h2 style={{color:"#282829",lineHeight:'35px',margin:'0'}}>
              Abhishek Som
            </h2>
            <pre style={{color:"#636466",fontSize:'13px',fontFamily:'helvetica'}}>1,167 followers   214 following</pre>
            <button className={styles.followButton}><FontAwesomeIcon
            icon={faUserPlus}
            size="sm"
            color="#DBD9D9"
            style={{ marginRight:'5px' }}
          />     <h5 style={{display:'inline',margin:'0',fontSize:'13px',fontFamily:'sans-serif'}}>Follow</h5></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
