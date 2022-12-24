import React from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faBarsStaggered,faUserGroup,faPen,faBell } from "@fortawesome/free-solid-svg-icons";

function Navbar(){
    return(
        <>
            <div className={styles.NavbarContainer}>
                <div className={styles.NavbarContentDiv}>
                    <img src={logo} alt="logo" style={{width:"10%"}}></img>
                    <div className={styles.Icon}>
                        <FontAwesomeIcon icon={faHouse} size="xl" style={{color:"#b92b27"}} />
                    </div>
                    <div className={styles.Icon}>
                        <FontAwesomeIcon icon={faBarsStaggered} size="xl" style={{color:"#b92b27"}} />
                    </div>
                    <div className={styles.Icon}>
                        <FontAwesomeIcon icon={faPen} size="xl" style={{color:"#b92b27"}} />
                    </div>
                    <div className={styles.Icon}>
                        <FontAwesomeIcon icon={faUserGroup} size="xl" style={{color:"#b92b27"}} />
                    </div>
                    
                    <div className={styles.Icon}>
                        <FontAwesomeIcon icon={faBell} size="xl" style={{color:"#b92b27"}} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
