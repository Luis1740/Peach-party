import { useRef, useEffect, useState } from "react";
import { levels } from "../game/levels";
import { player, flotador, movePlayer, loadLevel, goal } from "../game/player";
import { drawMap, drawObjects } from "../game/draw.jsx";

export default function Game() {
  const canvasRef = useRef(null);
  const tileSize = 50;

  const [levelIndex, setLevelIndex] = useState(0);
  const [, setTick] = useState(0);

  const level = levels[levelIndex];
  const map = level.map;

  useEffect(() => {
    loadLevel(level);
  }, [levelIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMap(ctx, map, tileSize);
      drawObjects(ctx, player, flotador, goal, tileSize);
      requestAnimationFrame(draw);
    }

    function handleKey(e) {
      if (e.key === "r" || e.key === "R") {
        loadLevel(level);
        setTick(t => t + 1);
        return;
      }

      let moved = false;

      if (e.key === "ArrowUp") moved = movePlayer(map, 0, -1);
      if (e.key === "ArrowDown") moved = movePlayer(map, 0, 1);
      if (e.key === "ArrowLeft") moved = movePlayer(map, -1, 0);
      if (e.key === "ArrowRight") moved = movePlayer(map, 1, 0);

      if (moved) setTick(t => t + 1);
    }

    window.addEventListener("keydown", handleKey);
    draw();

    return () => window.removeEventListener("keydown", handleKey);
  }, [level]);

  // 🏁 pasar de nivel automáticamente
  useEffect(() => {
    if (player.x === goal.x && player.y === goal.y) {
      setTimeout(() => {
        setLevelIndex(i => i + 1);
      }, 500);
    }
  }, [player.x, player.y]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={map[0].length * tileSize}
        height={map.length * tileSize}
        style={{
          border: "2px solid white",
          display: "block",
          margin: "0 auto",
          background: "#f1f38b",
        }}
      />

      <div style={{ textAlign: "center", color: "white" }}>
        <p>Nivel: {levelIndex + 1}</p>
        <p>Movimientos: {player.moves} / {player.maxMoves}</p>
        <p>Flotadores: {player.floats}</p>
      </div>
    </div>
  );
}