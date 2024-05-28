import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = timeRemaining <= 0;
  const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
  const score = Math.round( (1 - timeRemaining/(targetTime*1000) )*100 )

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset} >
        {userLost && 
      <h2>You Lost</h2> }
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}.
        </strong>
      </p>
      {timeRemaining <=0 && <p>Your time has expired!</p>}
      {timeRemaining > 0 && (
        <p>
          You stopped the timer with{" "}
          <strong>
            {formattedRemainingTime} second
            {formattedRemainingTime > 1 ? "s" : ""} left.
          </strong>
        </p>
      )}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
