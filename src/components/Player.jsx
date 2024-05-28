import { useRef, useState } from "react";


export default function Player() {
  const [nameEntered, setNameEntered] = useState(null)

  const playerName = useRef();

  function clickHandler () {
    setNameEntered(playerName.current.value)
    playerName.current.value = ''
  }

  return (
    <section id="player">
      <h2>Welcome {nameEntered ??'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"/>
        <button onClick={clickHandler}>Set Name</button>
      </p>
    </section>
  );
}
