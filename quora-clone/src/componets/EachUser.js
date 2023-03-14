import React from 'react'
import styles from '../styles/EachUser.module.css';

const EachUser = () => {
  return (
    <div className={styles.eachUserContainer}>
        <div className={styles.userInfo}>
            <div className={styles.userImg}>

            </div>
            <div className={styles.userDetails}>
                <h5 style={{margin:'0px'}}>Abhishek Som</h5>
                <h6 style={{margin:'0px'}}>25 followers</h6>
            </div>
        </div>
        <button className={styles.followUnFollow}>

        </button>
    </div>
  )
}

export default EachUser;