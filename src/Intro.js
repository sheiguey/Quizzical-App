import React from "react";
import './intro.css'

const Intro = (props)=>{
    return(
        
            <div className="content">
                <h1>Quizzical</h1>
                <p>A simple react Quizz app to test your general knowledge</p>
                <button onClick={props.display}>Start quizz</button>
            </div>
       
    )
   
}


export default Intro