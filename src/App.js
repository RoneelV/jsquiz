import React, { useState, useEffect } from 'react'
import logo from './quiz.svg'
import './App.css'

const mathList = [
   /*
   {
      question: 'Evaluate 5 % 20 / 5',
      type: 'text-box',
      answer: '1'
   },*/ //text-box implementation pending
   {
      question: <>What is the volume of the unit sphere?</>,
      type: '1-choice',
      options: [<>1</>, <>π</>, <>4π/3</>],
      answer: 2,
      answerStr: '4π/3'
   },
   {
      question: (
         <>
            Find next term in this sequence:
            <br />
            ..., 6, 2, 0, 0, 2, 6, 12, ??
         </>
      ),
      type: '1-choice',
      options: [<>20</>, <>16</>, <>30</>, <>42</>],
      answer: 0,
      answerStr: '20'
   },
   {
      question: (
         <>
            Find last term > 1:
            <br />
            128, 192, 144, 54, ...
         </>
      ),
      type: '1-choice',
      options: [<>2</>, <>1.5</>, <>3</>, <>10.125</>],
      answer: 3,
      answerStr: '10.125'
   },
   {
      question: (
         <>
            Solve for x:
            <br />
            3x - 2 = 2x + 3 - x
         </>
      ),
      type: '1-choice',
      options: [<>2</>, <>2.5</>, <>0</>],
      answer: 1,
      answerStr: '2.5'
   },
   {
      question: (
         <>
            Is A prime number or not:
            <br />A = 2019^4 + 4^2019
         </>
      ),
      type: '1-choice',
      options: [<>Yes</>, <>No</>, <>I don't know</>],
      answer: 1,
      answerStr: 'No'
   }
]

const miscList = [
   {
      question: <>What are "Little Man" and "Fat Boy"?</>,
      type: '1-choice',
      options: [<>Humans</>, <>Atom bombs</>, <>I don't know</>],
      answer: 1,
      answerStr: 'Atoms bombs'
   },
   {
      question: (
         <>What can you think of size of object with "Bonsai" adjective?</>
      ),
      type: '1-choice',
      options: [<>Tiny</>, <>Normal</>, <>Large</>],
      answer: 0,
      answerStr: 'Tiny'
   }, //n-choice implementation pending
   /*{
      question: 'Categorise squash',
      type: 'n-choice',
      options: ['Ball game', 'Team game', 'Individual game'],
      answer: [0,2]
   },*/ {
      question: <>Who is called the father of High fantasy genre?</>,
      type: '1-choice',
      options: [
         <>George R. R. Martin</>,
         <>J. K. Rowling</>,
         <>J. R. R. Tolkien</>
      ],
      answer: 2,
      answerStr: 'J. R. R. Tolkien'
   },
   {
      question: <>Who founded the GNU project?</>,
      type: '1-choice',
      options: [
         <>Richard Stallman</>,
         <>Linus Torvalds</>,
         <>Dennis Ritchie</>
      ],
      answer: 0,
      answerStr: 'Richard Stallman'
   },
   {
      question: <>How many Ballon d'Ors does Messi have won?</>,
      type: '1-choice',
      options: [<>0</>, <>6</>, <>5</>, <>7</>],
      answer: 1,
      answerStr: '6'
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
      return (
         <span title={'Correct answer: ' + genreList[genre][index].answerStr}>
            Not attempted
         </span>
      )
   } else if (answer === genreList[genre][index].answer) {
      return <span>Correct answer</span>
   } else {
      return (
         <span title={'Correct answer: ' + genreList[genre][index].answerStr}>
            Wrong answer
         </span>
      )
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
   let [seconds, setSeconds] = useState(0)
   let [minutes, setMinutes] = useState(0)

   useEffect(() => {
      if (submitted) {
         return
      }
      let secondsID = setInterval(() => {
         setSeconds(sec => (sec === 59 ? 0 : sec + 1))
      }, 1000)

      let minutesID = setInterval(() => {
         setMinutes(min => min + 1)
      }, 60000)

      return () => {
         clearInterval(secondsID)
         clearInterval(minutesID)
      }
   }, [submitted])

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
                     oldAnswers => oldAnswers.map((answer, index) =>
                        index === pageNo ? checked : answer
                     )
                  )
               }
               setSubmitted={() => setSubmitted(false)}
            />
            <br />
            <span>
               <button
                  onClick={() => setPage(page => page - 1)}
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
                  onClick={() => setPage(page => page + 1)}
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
               {minutes + ':' + seconds}
               {'  Page '}
               {pageNo + 1}/{currentList.length.toString()}
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
