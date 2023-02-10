import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/images/logo.png";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBarsStaggered,
  faUserGroup,
  faPen,
  faBell,
  faMagnifyingGlass,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";

function Navbar(props) {
  const [selectedComponent, setSelectedComponent] = useState('')
  const handleLogout = async (e) => {
    e.preventDefault();
    let response = await auth.logout();
    console.log("handlelogout", response);
    if (response.status == 200) {
      toast.success("User logged out!", toastInfo);
      navigate("/");
      return;
    } else {
      toast.error("Error in logging out user.", toastInfo);
    }
  };

  const handleProfilePage= ()=>{
    // navigate(`/userProfile/${}`)
  }

  const auth = useAuth();
  let navigate = useNavigate();
  var toastInfo = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  useEffect(()=>{
    console.log('auth in navbar', auth)
  }, [])
  return (
    <>
      <div className={styles.NavbarContainer}>
        <div className={styles.NavbarContentDiv}>
          <img src={logo} alt="logo" style={{ width: "8%" }}></img>
          <Link to='/home' className={styles.IconDiv} onClick={()=>setSelectedComponent('home')}
          >
            <FontAwesomeIcon
              icon={faHouse}
              size="lg"
              className={(selectedComponent=='home' || selectedComponent=='') ? styles.IconSelected : styles.Icon}
            />
          </Link>

          <Link to='/following' 
            className={styles.IconDiv} onClick={()=>setSelectedComponent('following')}
          >
            <FontAwesomeIcon
              icon={faBarsStaggered}
              size="lg"
              className={selectedComponent=='following' ? styles.IconSelected : styles.Icon}
            />
          </Link>

          <Link to='/answer' className={styles.IconDiv} onClick={()=>setSelectedComponent('answer')}
          >
            <FontAwesomeIcon
              icon={faPen}
              size="lg"
              className={selectedComponent=='answer' ? styles.IconSelected : styles.Icon}
            />
          </Link>

          <Link  to='/spaces' className={styles.IconDiv} onClick={()=>setSelectedComponent('spaces')}
          >
            <FontAwesomeIcon
              icon={faUserGroup}
              size="lg"
              className={selectedComponent=='spaces' ? styles.IconSelected : styles.Icon}
            />
          </Link>

          <Link to='/notifications' 
            className={styles.IconDiv} onClick={()=>setSelectedComponent('notifications')}
          >
            <FontAwesomeIcon
              icon={faBell}
              size="lg"
              className={selectedComponent=='notifications' ? styles.IconSelected : styles.Icon}
            />
          </Link>

          <div className={styles.searchBox}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="1x"
              style={{
                color: "#9d9d9f",
                position: "absolute",
                left: "30px",
                top: "13px",
                zIndex: "2",
                marginRight: "20px",
              }}
            />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search Quora"
            ></input>
          </div>

          <div className={styles.profilePicture}>
            <img
              src={auth.user.avatar}
              alt=""
              referrerPolicy="no-referrer"
              style={{ width: "25px", height: "25px", borderRadius: "50px" }}
              onClick={() => {
                props.handleProfileDropDown();
              }}
            ></img>
          </div>
          {props.profileDropDown && (
            <div className={styles.profileDropDown}>
              <div className={styles.dropDownProfilePic} onClick={handleProfilePage}>
                <img
                  src={auth.user.avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50px",
                  }}
                ></img>
                <h3
                  style={{
                    marginTop: "5px",
                    fontSize: "18px",
                    lineHeight: "25px",
                    fontWeight: "700",
                    fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                  }}
                >
                  {auth.user.name}
                </h3>
              </div>
              <div className={styles.dropDownItems}>
                <div className={styles.dropDownItemsItem}>
                  <p
                    style={{
                      fontSize: "16px",
                      margin: "0px",
                      fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faGear}
                      size="lg"
                      style={{ color: "#282829" }}
                    />{" "}
                    &nbsp;Settings
                  </p>
                </div>
                <div className={styles.dropDownItemsItem}>
                  <p
                    style={{
                      fontSize: "16px",
                      margin: "0px",
                      fontFamily: "Cantarell, Helvetica Neue, sans-serif",
                    }}
                    onClick={handleLogout}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      size="lg"
                      style={{ color: "#282829" }}
                    />{" "}
                    &nbsp;Logout
                  </p>
                </div>
              </div>
            </div>
          )}
          <button
            type="button"
            className={styles.addQuestion}
            onClick={props.handleIsAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar

