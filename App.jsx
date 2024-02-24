import React, { useEffect, useState } from 'react'
import data from "./Question.json"
export const App = () => {
  const [datas, setDatas] = useState(data);
  const [seconds, setSeconds] = useState(10);
  const [count, setCount] = useState(0);
  const [intervalID, setintervalID] = useState(null);
  const [AnswerCount, setAnswerCount] = useState(0);
  const [check, setCheck] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      setintervalID(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const finish = () => {
    clearInterval(intervalID);
    setCheck(0);
  }
  useEffect(() => {
    if (seconds < 1) finish();
  }, [seconds]);

  const questionHandleChange = (e) => {
    setSeconds(10);
    (e.target.textContent.toLowerCase() === datas[count]["answer"].toLowerCase()) ? setAnswerCount(AnswerCount + 1) : "";
    (count + 1 < datas.length) ? setCount((count) => count + 1) : finish();
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
              <>
                {"Score "}{AnswerCount}
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
export default App;