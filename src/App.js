import React,{useState,useEffect} from 'react';
import Intro from './Intro';
import { nanoid } from 'nanoid';
import Quizz from './Quiz';
import Preload from './preloader';
import './App.css'




function App() {
  const [preload , setPreload] =useState(false)
  const [intro , setIntro] = useState(true)
  const [Quizzes,setQuizzes]= useState([])
  const [replay,setReplay]= useState(false)
  const [checkAnswer,setCheckAnswer] = useState(false)
  const [correctAnswers,setcorrectAnswers] = useState(0)
  const [displaySetings,setDisplaySetings] = useState(false)
  const [totalQuestions,setTotalQuestions] =useState(5)
  const [url,setUrl]=useState('https://opentdb.com/api.php?amount=5')
  
 useEffect(()=>{
    getQuizz();
  },[replay]) 


  async function getQuizz() {
    let i=0
    setPreload(true)
    const response = await fetch(url);
    const jsonData = await response.json();
    const data = jsonData.results.map(item=>{
     let QA = []
      i++
      const random = Math.floor(Math.random() * 5)
      item.incorrect_answers.map((incorrect) => {
        return (
            QA.push({incorrect:incorrect,isCheked:false,id:nanoid() })
        )
    })
    QA.splice(random, 0, { answer: item.correct_answer,isCheked:false,id:nanoid()})
    return{...item,propositions:QA,i}
    })
    setQuizzes(data)
    setPreload(false) ;
  }

  function updateUrl(difficulty,numberOfQuestions){
    const newUrl=`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=${difficulty}`
  
    if(difficulty==='any'){
      setUrl(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
    }else{
      setUrl(newUrl)
    }
    setTotalQuestions(numberOfQuestions)
    displayModalSeting()
    resetPlay() 
  }


  function CheckAnswers(id,item){
      const currentIndex = item.i-1
      let q
      const updateQuizz = Quizzes.map((quiz,index)=>{
        q = quiz.propositions.map(item=>{
         if(item.id===id){
          return {...item,isCheked:true}
         }else if (index===currentIndex){
           return {...item, isCheked:false }
         }else{
          return {...item}
         };
       })
       return {...quiz,propositions:q}
      })
    setQuizzes(updateQuizz)
  }


  function calculateCorrectAnswer(){
     Quizzes.map(quiz=>{
       quiz.propositions.map(item=>{
         if(item.answer && item.isCheked===true){
            setcorrectAnswers(prevCorrectAnswer=>prevCorrectAnswer +1)
         }else{}
       })
     })
  }


  function Result(){
     calculateCorrectAnswer()
     setCheckAnswer(prevCheckAnswer=>!prevCheckAnswer)
  }

  function DisplayMain(){
    setIntro(false)
  }

  function resetPlay(){
    setReplay(prevReplay=>!prevReplay);
    setcorrectAnswers(0);
  }

  function displayModalSeting(){
     return setDisplaySetings(prevDisplaysetings=>!prevDisplaysetings)
  }

  return (
    <React.Fragment>
      <div className='blob1'> </div>
      <div className='blob2'> </div>
      {
        intro?<Intro display={DisplayMain}/>:
         preload?<Preload/>:
         <Quizz 
          quizzes={ 
            Quizzes
          }
          CheckAnswer={checkAnswer}
          check={CheckAnswers}
          result={Result}
          resetPlay={resetPlay}
          correctAnswers ={correctAnswers}
          displayModalSetings={displayModalSeting}
          displaySetings={displaySetings}
          setUrl={updateUrl}
          totalQuestions={totalQuestions}
        />
        
      }
    </React.Fragment>
  );
}

export default App;
