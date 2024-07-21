import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(
  ({ result, targetTime, remainingTime, handleReset }, ref) => {
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    //   useEffect(() => {
    //       if (ref.current) {
    //         ref.current.showModal();
    //       }
    //     }, [ref]);
    // or using useImperativeHandle
    const dialog = useRef();
    useImperativeHandle(ref, () => {
      return {
        openModal() {
          dialog.current.showModal();
        },
      };
    });
    return createPortal(
      <dialog className="result-modal" ref={dialog} onClose={handleReset}>
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer at{" "}
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={handleReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
