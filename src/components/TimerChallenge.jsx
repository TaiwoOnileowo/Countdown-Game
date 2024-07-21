import React, { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerStarted = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  
  const timer = useRef();
  const dialog = useRef();

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
  
    dialog.current.openModal();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.openModal();
    clearInterval(timer.current);
    // setTimeRemaining(targetTime * 1000);
  }

  function handleResetTimer(){
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} handleReset={handleResetTimer}/>
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer is inactive"}{" "}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
