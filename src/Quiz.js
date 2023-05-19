import React from "react";
import CheckAnswer from "./CheckAnswer";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import './Quizzz.css'
import Seting from "./seting";
const Quizz = (props) => {
    const img= '/seting.png'

    return (
       
        <div className="container">
            {   
                props.quizzes.map((quizz) => {
                    return (
                        <>
                            <div className="body" key={nanoid()} >
                                <h4>
                                    {decode(quizz.question)}
                                </h4>
                                <div className="proposition">
                                    {
                                        quizz.propositions.map((item) => {
                    
                                            return (
                                               <>
                                               <input 
                                               type="radio" 
                                               id={item.id}  
                                               name={decode(quizz.question)} 
                                              
                                               
                                               />
                                               <label 
                                                 className={
                                                 ((item.isCheked===true && props.CheckAnswer===false) && 'checked') ||
                                                 ((props.CheckAnswer===true && item.answer) && 'answer') ||
                                                 ((props.CheckAnswer===true && item.incorrect && item.isCheked===true) && 'red') }
                                                 htmlFor={item.id}  
                                                 onClick={()=>props.check(item.id,quizz)}
                                                 >
                                                    {decode(item.answer)}  
                                                    {decode(item.incorrect)}
                                                </label>
                                              </ > 
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })
            }

        <CheckAnswer
         answerNumber={props.answerNumber} 
         CheckAnswer={props.CheckAnswer}
         result={props.result}
         replay={props.resetPlay}
         correctAnswers={props.correctAnswers}
         totalQuestions={props.totalQuestions}
        />
        <div className='seting' onClick={()=>props.displayModalSetings()}><img src={img} alt="seting" /></div>
        {
            props.displaySetings===true &&
            <Seting 
            displayModalSetings={props.displayModalSetings} 
            setUrl={props.setUrl}
            />
        }
      
       </div>
    )
}

export default Quizz