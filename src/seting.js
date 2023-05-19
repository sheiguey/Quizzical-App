import React,{useState} from "react";
import './seting.css'

const Seting =(props)=>{
	const [numberOfQuestions,setNumberOfQuestions]=useState(5)
	const [difficulty,setDifficulty]=useState('any')
	const closeModal =()=>props.displayModalSetings()

    return(
		<div className="modal">
			<div className="modal-content">
				<div className="close-modal-btn-container">
					<button className="modal-close-btn" onClick={closeModal} >X</button>
				</div>
				<div className="modal-inner">
					<form >
						<div className="form-control">
							<label for="difficulty">Select Difficulty:</label>

							<select name="difficulty" id="cars" onChange={(e)=>setDifficulty(e.target.value) }>
							    <option value="any">Any Difficulty</option>
								<option value="aasy">Easy</option>
								<option value="medium">Meduim</option>
								<option value="hard">hard</option>
							</select>
						</div>
						<div className="form-control">
							<label for="numberOfQuestions">Number of Questions:</label>
							<input name="numberOfQuestions" 
							type="number" 
							min={5} 
							defaultValue={5} 
							onChange={(e)=>setNumberOfQuestions(e.target.value) }
							/>
						</div>

						<div className="modal-choice-btns">
							<button type="button" className="modal-btn" onClick={()=>props.setUrl(difficulty,numberOfQuestions)}>Accept</button>
						</div>

					</form>
				</div>
			</div>

		</div>
    )
}

export default Seting