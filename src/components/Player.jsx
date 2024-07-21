import React, {useState, useRef} from "react";

export default function Player() {

  const [playerName, setPlayerName]= useState(null)
const inputRef= useRef(null)

function handleClick (){
  setPlayerName(inputRef.current.value)
  inputRef.current.value=""
}

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={inputRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
