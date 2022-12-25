import React from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faBarsStaggered,faUserGroup,faPen,faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navbar(){
    return(
        <>
            <div className={styles.NavbarContainer}>
                <div className={styles.NavbarContentDiv}>
                    <img src={logo} alt="logo" style={{width:"8%"}}></img>
                    <div className={styles.IconDiv}>
                        <FontAwesomeIcon icon={faHouse} size="lg" className={styles.Icon}  />
                    </div>
                    <div className={styles.IconDiv}>
                        <FontAwesomeIcon icon={faBarsStaggered} size="lg" className={styles.Icon}   />
                    </div>
                    <div className={styles.IconDiv}>
                        <FontAwesomeIcon icon={faPen} size="lg" className={styles.Icon}  />
                    </div>
                    <div className={styles.IconDiv}>
                        <FontAwesomeIcon icon={faUserGroup} size="lg" className={styles.Icon}  />
                    </div>
                    
                    <div className={styles.IconDiv}>
                        <FontAwesomeIcon icon={faBell} size="lg" className={styles.Icon}  />
                    </div>

                    <div className={styles.searchBox}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="md" style={{color: '#9d9d9f', position:'absolute', left: '30px', top:'13px', zIndex: '2', marginRight: '20px'}}/>
                        <input className={styles.searchInput} type='text' placeholder='Search Quora'></input>
                    </div>

                    <div className={styles.profilePicture}>
                        <img src='' alt="" style={{width:'25px', height:'25px', border: '1px solid black', borderRadius: '50px'}}></img>
                    </div>

                    <button type="button" className={styles.addQuestion}>Add Question</button>
            
                </div>
            </div>
        </>
    )
}

export default Navbar;
