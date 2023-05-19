import React from "react";
import './checkAnswer.css'

const CheckAnswer = (props)=>{
    function replay(){
        return(
          props.result(),
          props.replay()
        ) 
    }

     return(
        <div className="check-answers">
          { props.CheckAnswer===false?<button onClick={props.result} className="check">Check Answers</button>:
          <><h3>You scored  {props.correctAnswers}/{props.totalQuestions} correct answers</h3> <button  onClick={replay} className="play">Play again</button></>}
        </div>
      
     )
}

export default CheckAnswer