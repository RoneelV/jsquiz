import React, { useState, useEffect } from 'react'
import logo from './quiz.svg'
import './App.css'
import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: 'jsquiz-roneel.firebaseapp.com',
   databaseURL: 'https://jsquiz-roneel.firebaseio.com',
   projectId: 'jsquiz-roneel',
   storageBucket: 'jsquiz-roneel.appspot.com',
   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
   appId: '1:992362490990:web:12d9fb9455ebab70930a7f'
}
firebase.initializeApp(firebaseConfig)

let database = firebase.firestore()

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
   let { name, genre, formSubmitted } = states
   let { setName, setGenre, setFormSubmitted } = methods
   const handleSubmit = (e, setFormSubmitted) => {
      e.preventDefault()
      name.length > 0 && genre.length > 0 && setFormSubmitted(true)
   }
   return (
      <div className="Page" id="StartPage">
         <header>Please Fill this form</header>
         <br />
         <main className="Font-smaller">
            <form onSubmit={e => handleSubmit(e, setFormSubmitted)}>
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
                        setFormSubmitted(false)
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
                        setFormSubmitted(false)
                     }}
                  >
                     <option value="">--please choose an option--</option>
                     <option value="math">Mathematics</option>
                     <option value="misc">Miscellaneous</option>
                  </select>
               </div>
               <button className="Sub-button">Submit</button>
            </form>
            <br />
            <>Notes:</>
            <ul className="Font-smaller">
               <li>Submission of form is required to start</li>
               <li>
                  <ul>
                     Scoring system:
                     <li>Correct answer: +4 points</li>
                     <li>Wrong answer: -1 point</li>
                     <li>Answer not attempted: 0</li>
                  </ul>
               </li>
            </ul>
         </main>
         <button className="Nav-button">
            <a
               href={formSubmitted ? '#QuizMain' : '#LeaderBoardPage'}
               className="App-link"
            >
               {formSubmitted ? <>I'm Ready</> : <>Leaderboard</>}
            </a>
         </button>
      </div>
   )
}

function QuizAns({ pageNo, quizObj, genre, submitted, setAnswers }) {
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
                        setAnswers(index)
                     }}
                     disabled={submitted}
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

function QuizMain({ genre, name, quizSubmitted, setQuizSubmitted }) {
   let [pageNo, setPage] = useState(0)
   let currentList = genreList[genre]
   let answerList = []
   answerList.length = currentList.length
   answerList.fill(-1)
   let [answers, setAnswers] = useState(answerList)
   let [seconds, setSeconds] = useState(0)
   let [minutes, setMinutes] = useState(0)
   const scoreReducer = (acc, cur, idx) => {
      if (cur === -1) {
         return acc
      } else if (cur === genreList[genre][idx].answer) {
         return acc + 4
      } else {
         return acc - 1
      }
   }
   let addToDB = (name, genre, score, minutes, seconds) => {
      database
         .collection('entries')
         .doc(
            name +
               genre +
               score.toString() +
               minutes.toString() +
               seconds.toString()
         )
         .set({ name, genre, score, minutes, seconds })
   }

   useEffect(() => {
      if (quizSubmitted) {
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
   }, [quizSubmitted])

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
               submitted={quizSubmitted}
               setAnswers={checked =>
                  setAnswers(oldAnswers =>
                     oldAnswers.map((answer, index) =>
                        index === pageNo ? checked : answer
                     )
                  )
               }
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
                  onClick={() => {
                     setQuizSubmitted(true)
                     addToDB(
                        name,
                        genre,
                        answers.reduce(scoreReducer, 0),
                        minutes,
                        seconds
                     )
                  }}
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
            {quizSubmitted && (
               <button className="Nav-button">
                  <a href="#QuizRes" className="App-link Font-smaller">
                     Show me Results
                  </a>
               </button>
            )}
            <footer className="Font-smaller" id="Footer-pageNo">
               {minutes + ':' + seconds}
               {'  Question '}
               {pageNo + 1}/{currentList.length.toString()}
            </footer>
         </div>
         {quizSubmitted && (
            <div className={quizSubmitted && 'Page'} id="QuizRes">
               <h3>Hi {name}, Here are the results:</h3>
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
               Score: {answers.reduce(scoreReducer, 0)}
               <br />
               Time taken: {minutes + ':' + seconds}
               <button className="Nav-button">
                  <a href="#LeaderBoardPage" className="App-link">
                     Leaderboard/Retry
                  </a>
               </button>
            </div>
         )}
      </>
   )
}

function LeaderBoard({ quizSubmitted }) {
   let [entriesQuery, setEntriesQery] = useState([])
   useEffect(() => {
      database
         .collection('entries')
         .orderBy('score', 'desc')
         .orderBy('minutes', 'asc')
         .orderBy('seconds', 'asc')
         .limit(7)
         .get()
         .then(querySnapShot => {
            setEntriesQery(querySnapShot.docs)
         })
      return () => {
         setEntriesQery([])
      }
   }, [quizSubmitted])

   return (
      <div className="Page" id="LeaderBoardPage">
         <h3>Leaderboard</h3>
         <table className="Font-smaller">
            <thead>
               <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Time</th>
               </tr>
            </thead>
            <tbody>
               {entriesQuery.map((doc, index) => (
                  <tr key={doc.id}>
                     <td>{index + 1}</td>
                     <td>{doc.data().name}</td>
                     <td>{doc.data().score}</td>
                     <td>
                        {doc.data().minutes.toString() +
                           ':' +
                           doc.data().seconds.toString()}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <button className="Nav-button">
            <a href="#StartPage" className="App-link">
               Go back to start page
            </a>
         </button>
      </div>
   )
}

function App() {
   let [name, setName] = useState('')
   let [genre, setGenre] = useState('')
   let [formSubmitted, setFormSubmitted] = useState(false)
   let [quizSubmitted, setQuizSubmitted] = useState(false)
   return (
      <>
         <HomePage />
         <StartPage
            states={{ name, genre, formSubmitted }}
            methods={{
               setName,
               setGenre,
               setFormSubmitted
            }}
         />
         {formSubmitted === true && (
            <QuizMain
               genre={genre}
               name={name}
               quizSubmitted={quizSubmitted}
               setQuizSubmitted={setQuizSubmitted}
            />
         )}
         <LeaderBoard quizSubmitted={quizSubmitted} />
      </>
   )
}

export default App
