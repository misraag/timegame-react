import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const [timeExpired, setTimeExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const timer = useRef();
  const dialog = useRef();

  function handleStart() {
    setTimerStarted(true);
    timer.current = setTimeout(() => {
      setTimeExpired(true);
      dialog.current.open();
    }, targetTime * 1000);
  }

  function handleStop() {
    clearTimeout(timer.current);
    setTimerStarted(false);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        result="lost!"
        targetTime={targetTime}
      ></ResultModal>
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
          {timerStarted ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
