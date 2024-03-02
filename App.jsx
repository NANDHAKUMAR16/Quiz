import React, { useEffect, useState } from 'react'
import data from "./Question.json"
export const App = () => {
  const [datas, setDatas] = useState(data);
  const [seconds, setSeconds] = useState(10);
  const [count, setCount] = useState(0);
  const [intervalID, setintervalID] = useState(null);
  const [AnswerCount, setAnswerCount] = useState(0);
  const [check, setCheck] = useState(0);
  useEffect(() => {
    if (check == 1) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        setintervalID(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [check]);

  const finish = () => {
    clearInterval(intervalID);
    setCheck(2);
  }
  useEffect(() => {
    if (seconds < 1) questionChange();
  }, [seconds]);

  const startTheQuiz = () => {
    setCheck(1);
  }

  const questionChange = () => {
    if (count + 1 < datas.length) {
      setCount((count) => count + 1);
      setSeconds(10);
    }
    else {
      finish();
    }
  }
  const questionHandleChange = (e) => {
    setSeconds(10);
    (e.target.textContent.toLowerCase() === datas[count]["answer"].toLowerCase()) ? setAnswerCount((AnswerCount) => AnswerCount + 1) : "";
    (count + 1 < datas.length) ? setCount((count) => count + 1) : finish();
  }
  const resetTheQuiz = () => {
    setSeconds(10);
    setCount(0);
    setintervalID(null);
    setAnswerCount(0)
    setCheck(1);
  }
  return (
    <>
      <div className="container">
        <div className="box">
          {(check == 1) && (
            <>
              <header>{"Question "}{count + 1}</header>
              <div className="question">
                {datas[count].question}
              </div>
              <div className="options">
                {(datas[count]["option"]).map((el, index) => (
                  <span id={index} onClick={questionHandleChange} key={Math.random()} name={el}>{el.charAt(0).toUpperCase() + el.slice(1, el.length)}</span>
                ))}
              </div>
              <div className="time">
                {"Time left : "}{seconds}{" sec"}
              </div>
            </>)}
          {
            (check == 0) && (
              <div className="btn">
                <button style={{ padding: "3px 30px", backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={startTheQuiz}>CLICK TO START THE QUIZ</button>
              </div>
            )
          }
          {
            (check == 2) && (
              <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
                <header>{"Thank you !"}</header>
                {"Score "}{AnswerCount + 1}
                <div>
                  <button onClick={resetTheQuiz} style={{ padding: "3px 30px", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>RESTART THE GAME</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
export default App;
