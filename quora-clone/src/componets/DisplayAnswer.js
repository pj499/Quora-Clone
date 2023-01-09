import React from "react";
import styles from "../styles/DisplayAnswer.module.css";
import questionStyles from "../styles/DisplayQuestion.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faComment } from "@fortawesome/free-solid-svg-icons";

const DisplayAnswer = () => {
  const [showmore, setShowmore] = useState(false);
let text= `Snoopy is a beagle! In the beginning, Snoopy wasn’t drawn to be a beagle intentionally. He was actually modeled on one of Charles M. Schulz’s childhood dogs (who wasn’t a beagle!), named Spike, who was a pointer mix of some kind. In fact, it wasn’t until 1960 that it was revealed that Snoopy was a beagle. The first mention was published 12/5/1960. Peanuts had been running daily for over a decade at that point. 

Snoopy was a beagle because Schulz thought ‘B’ words were funny. That’s why Schroeder loves Beethoven so much instead of Handel or Mozart. Funny words are just as important as funny drawing in comics, and Schulz was usually very careful with his word choices. 

His childhood dog, Spike, was the subject of Schulz’s first published drawing, appearing in Ripley’s Believe It Or Not on February 22, 1937, and was absolutely an early inspiration for Snoopy. "I patterned Snoopy in appearance after a dog I had when I was about 13 years old. His name was Spike …”, Schulz said in an interview. 

Spike died not long after Schulz came home from World War II. Charles Schulz explains where the name Snoopy came from in a 1967 interview, “I used Snoopy because my mother used to think that this would be a good name for a dog, even though at that time we had a dog named Spike.” Charles Schulz added in a 1971 interview about Snoopy’s origins, “Actually he was named Sniffy at first. But I was walking past a newsstand one day and saw a stack of comic magazines and one was called “Sniffy”, and it was about a little dog, so I had to go
back and change the name to Snoopy.”`;

  useEffect(() => {
  }, [showmore])
  
  return (
    <div className={styles.answerContainer}>
      <div className={questionStyles.profileInfo}>
        <img
          src="https://i.pinimg.com/originals/46/e7/9a/46e79ad5103cc80833f68c308925fb21.jpg"
          alt=""
          referrerPolicy="no-referrer"
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50px",
          }}
        ></img>
        <h6
          style={{
            paddingLeft: "10px",
            fontFamily: "Cantarell, Helvetica Neue, sans-serif",
          }}
        >
          Prajakta Pikale
        </h6>
      </div>

      <div className={styles.answerContent}>
        {showmore? text: text.substring(0, 450)+"...."}
        <button onClick={()=>{setShowmore(!showmore)}} className={styles.showMoreButton}>
          {showmore? "Show Less": "Show More"}
        </button>
      </div>
    </div>
  );
};

export default DisplayAnswer;
