import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faBarsStaggered,faUserGroup,faPen,faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";

function Navbar(props){
    // const [profileDropDown, setProfileDropDown]= useState(false);

    const auth = useAuth();
    console.log('user in navbar', auth.user)
    return(
        <>
            <div className={styles.NavbarContainer}>
                <div className={styles.NavbarContentDiv}>
                    <img src={logo} alt="logo" style={{width:"8%"}}></img>
                    <div className={styles.IconDiv} onClick={props.onClick.homeClick}>
                        <FontAwesomeIcon icon={faHouse} size="lg" className={props.clickState.home? styles.IconSelected: styles.Icon}  />
                    </div>
                    <div className={styles.IconDiv} onClick={props.onClick.followingClick}>
                        <FontAwesomeIcon icon={faBarsStaggered} size="lg" className={props.clickState.following? styles.IconSelected: styles.Icon}   />
                    </div>
                    <div className={styles.IconDiv} onClick={props.onClick.answerClick}>
                        <FontAwesomeIcon icon={faPen} size="lg" className={props.clickState.answer? styles.IconSelected: styles.Icon} />
                    </div>
                    <div className={styles.IconDiv} onClick={props.onClick.spacesClick}>
                        <FontAwesomeIcon icon={faUserGroup} size="lg" className={props.clickState.spaces? styles.IconSelected: styles.Icon}  />
                    </div>
                    
                    <div className={styles.IconDiv} onClick={props.onClick.notificationsClick}>
                        <FontAwesomeIcon icon={faBell} size="lg" className={props.clickState.notifications? styles.IconSelected: styles.Icon}  />
                    </div>

                    <div className={styles.searchBox}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" style={{color: '#9d9d9f', position:'absolute', left: '30px', top:'13px', zIndex: '2', marginRight: '20px'}}/>
                        <input className={styles.searchInput} type='text' placeholder='Search Quora'></input>
                    </div>

                    <div className={styles.profilePicture} >
                        <img src={auth.user.avatar} alt="" 
                            referrerpolicy="no-referrer"
                            style={{width:'25px', height:'25px', border: '1px solid black', borderRadius: '50px'}}>
                        </img>
                        {/* {profileDropDown && <div className={styles.profileDropDown}>

                        </div>} */}
                    </div>

                    <button type="button" className={styles.addQuestion}>Add Question</button>
            
                </div>
            </div>
        </>
    )
}

export default Navbar;
