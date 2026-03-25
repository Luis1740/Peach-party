import React, { useState } from "react";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import "./App.css";

function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <div className="App">
      {!inGame ? (
        // Cuando pulsas "Jugar", setInGame pasa a true
        <MainMenu onStart={() => setInGame(true)} />
      ) : (
        <div className="game-screen-container">
          <button 
            className="btn-back-menu"
            onClick={() => setInGame(false)}
          >
            Volver al Menú
          </button>
          <Game />
        </div>
      )}
    </div>
  );
}

export default App;