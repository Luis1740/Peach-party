import React from "react";
import "./MainMenu.css";

const MainMenu = ({ onStart }) => {
  return (
    <div className="menu-wrapper">
      {/* Decoración de fondo */}
      <div className="palmera left"></div>
      <div className="palmera right"></div>

      <div className="waves">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Contenido del Menú */}
      <div className="menu-container">
        <h1 className="title">Peach Party</h1>

        <div className="actions">
          <button className="menu-btn" onClick={onStart}>Jugar</button>
          <button className="menu-btn" onClick={() => alert("Próximamente")}>Ajustes</button>
          <button className="menu-btn" onClick={() => window.close()}>Salir</button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;