import React, { useState } from 'react'
import logo from './quiz.svg'
import './App.css'

const mathList = [
   /*{
      question: '1 + 3 = ?',
      type: 'text-box',
      answer: '4'
   },
   {
      question: 'Evaluate 4 * 3 / 6 + 2',
      type: 'text-box',
      answer: '4'
   },
   {
      question: 'Evaluate 5 % 20 / 5',
      type: 'text-box',
      answer: '1'
   },*/ //text-box implementation pending
   {
      question: 'What do you get after subtracting 5 with 2 * floor(5 / 2)?',
      type: '1-choice',
      options: ['5 % 2', '5 / 2'],
      answer: 0
   },
   {
      question: 'Evaluate floor(104 / 5) * 5 + 104 % 5',
      type: '1-choice',
      options: ['100', '105', '108', '104'],
      answer: 3
   }
]

const miscList = [
   {
      question: 'What are "Little Man" and "Fat Boy"?',
      type: '1-choice',
      options: ['Humans', 'Atom bombs', "I don't know"],
      answer: 1
   },
   {
      question: 'What can you think of size of object with "Bonsai" adjective?',
      type: '1-choice',
      options: ['Tiny', 'Normal', 'Large'],
      answer: 0
   }, //n-choice implementation pending
   /*{
      question: 'Categorise squash',
      type: 'n-choice',
      options: ['Ball game', 'Team game', 'Individual game'],
      answer: [0,2]
   },*/ {
      question: 'Who is called the father of High fantasy genre?',
      type: '1-choice',
      options: ['George R. R. Martin', 'J. K. Rowling', 'J. R. R. Tolkien'],
      answer: 2
   }
]
const genreList = {
   math: mathList,
   misc: miscList
}

function HomePage() {
   return (
      <div className="Page" id="HomePage">
         <main id="HomePage-main">
            <img src={logo} className="App-logo" alt="logo" />
            <div>Awesome Quiz</div>
            <div id="Author-info">by Roneel</div>
            <button className="Nav-button">
               <a href="#StartPage" className="App-link">
                  Let's Start Now
               </a>
            </button>
         </main>
         <footer id="Footer-credits">
            Icons made by{' '}
            <a
               href="https://www.flaticon.com/authors/prosymbols"
               title="Prosymbols"
               className="App-link"
            >
               Prosymbols
            </a>{' '}
            from{' '}
            <a
               href="https://www.flaticon.com/"
               title="Flaticon"
               className="App-link"
            >
               www.flaticon.com
            </a>
         </footer>
      </div>
   )
}

function StartPage({ states, methods }) {
   let { name, genre, submitted } = states
   let { setName, setGenre, setSubmitted } = methods
   const handleSubmit = (e, setSubmitted) => {
      e.preventDefault()
      name.length > 0 && genre.length > 0 && setSubmitted(true)
   }
   return (
      <div className="Page" id="StartPage">
         <header>Please Fill this form</header>
         <br />
         <main className="Font-smaller">
            <form onSubmit={e => handleSubmit(e, setSubmitted)}>
               <div>
                  <label htmlFor="#Inp-name">Name: </label>
                  <input
                     type="text"
                     name="Inp-name"
                     id="Inp-name"
                     placeholder="John Doe"
                     required
                     value={name}
                     onChange={e => {
                        setName(e.target.value)
                        setSubmitted(false)
                     }}
                  />
               </div>

               <div>
                  <label htmlFor="#Inp-genre">Genre: </label>
                  <select
                     name="Inp-genre"
                     id="Inp-genre"
                     required
                     value={genre}
                     onChange={e => {
                        setGenre(e.target.value)
                        setSubmitted(false)
                     }}
                  >
                     <option value="">--please choose an option--</option>
                     <option value="math">Mathematics</option>
                     <option value="misc">Miscellaneous</option>
                  </select>
               </div>
               <button className="Sub-button">Submit</button>
            </form>
            <br /> <br />
            <span className="Align-left">Notes:</span>
            <ul>
               <li>Submission of form is required</li>
            </ul>
            <br />
         </main>
         <button className="Nav-button" disabled={!submitted}>
            {submitted ? (
               <a href="#QuizMain" className="App-link">
                  I'm Ready
               </a>
            ) : (
               "I'm Ready"
            )}
         </button>
      </div>
   )
}

function QuizAns({ pageNo, quizObj, genre, setAnswers, setSubmitted }) {
   if (quizObj.type === '1-choice') {
      return (
         <div className="AnswerBox">
            <label>Answer: </label>
            {quizObj.options.map((option, index) => (
               <span
                  className="Radio-span Font-smaller"
                  key={genre + '-' + pageNo.toString() + '-' + index.toString()}
               >
                  <input
                     type="radio"
                     value={option}
                     name={'radio' + pageNo.toString()}
                     id={
                        genre + '-' + pageNo.toString() + '-' + index.toString()
                     }
                     onClick={() => {
                        setSubmitted()
                        setAnswers(index)
                     }}
                  />
                  <label
                     htmlFor={
                        genre + '-' + pageNo.toString() + '-' + index.toString()
                     }
                  >
                     {option}
                  </label>
               </span>
            ))}
         </div>
      )
   } //text-box and n-choice type pending
}

function QuizSubResult({ answer, genre, index }) {
   if (answer === -1) {
      return <>Not attempted</>
   } else if (answer === genreList[genre][index].answer) {
      return <>Correct answer</>
   } else {
      return <>Wrong answer</>
   }
}

function QuizMain({ genre }) {
   let [pageNo, setPage] = useState(0)
   let currentList = genreList[genre]
   let answerList = []
   answerList.length = currentList.length
   answerList.fill(-1)
   let [answers, setAnswers] = useState(answerList)
   let [submitted, setSubmitted] = useState(false)

   return (
      <>
         <div className="Page" id="QuizMain">
            {' '}
            <p>{currentList[pageNo].question}</p>
            <br />
            <QuizAns
               pageNo={pageNo}
               quizObj={currentList[pageNo]}
               genre={genre}
               setAnswers={checked =>
                  setAnswers(
                     answers.map((answer, index) =>
                        index === pageNo ? checked : answer
                     )
                  )
               }
               setSubmitted={() => setSubmitted(false)}
            />
            <br />
            <span>
               <button
                  onClick={() => setPage(pageNo - 1)}
                  disabled={pageNo === 0}
                  className="Sub-button"
               >
                  Previous
               </button>
               <button
                  className="Sub-button"
                  onClick={() => setSubmitted(true)}
               >
                  Submit
               </button>
               <button
                  onClick={() => setPage(pageNo + 1)}
                  disabled={pageNo === currentList.length - 1}
                  className="Sub-button"
               >
                  Next
               </button>
            </span>
            {submitted && (
               <button className="Nav-button">
                  <a href="#QuizRes" className="App-link Font-smaller">
                     Show me Results
                  </a>
               </button>
            )}
            <footer className="Font-smaller" id="Footer-pageNo">
               Page {pageNo + 1} / {currentList.length.toString()}
            </footer>
         </div>
         {submitted && (
            <div className={submitted && 'Page'} id="QuizRes">
               <h3>Results:</h3>
               <ol className="Font-smaller">
                  {answers.map((answer, index) => (
                     <li key={'Res' + index.toString()}>
                        <QuizSubResult
                           genre={genre}
                           index={index}
                           answer={answer}
                        />{' '}
                     </li>
                  ))}
               </ol>
            </div>
         )}
      </>
   )
}

function App() {
   let [name, setName] = useState('')
   let [genre, setGenre] = useState('')
   let [submitted, setSubmitted] = useState(false)
   return (
      <>
         <HomePage />
         <StartPage
            states={{ name, genre, submitted }}
            methods={{
               setName,
               setGenre,
               setSubmitted
            }}
         />
         {submitted === true && <QuizMain genre={genre} />}
      </>
   )
}

export default App
