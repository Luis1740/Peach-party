import { useRef, useEffect } from "react";
import { map } from "../game/map";
import { player, flotador, movePlayer, resetPlayer, goal } from "../game/player";
import { drawMap, drawObjects } from "../game/draw.jsx";

export default function Game() {
  const canvasRef = useRef(null);
  const tileSize = 50;

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
      // Tecla para reiniciar nivel
      if (e.key === "r" || e.key === "R") {
        resetPlayer();
        return;
      }

      // No mover si se acabaron los movimientos
      if (player.moves >= player.maxMoves) return;

      if (e.key === "ArrowUp") movePlayer(map, 0, -1);
      if (e.key === "ArrowDown") movePlayer(map, 0, 1);
      if (e.key === "ArrowLeft") movePlayer(map, -1, 0);
      if (e.key === "ArrowRight") movePlayer(map, 1, 0);
    }

    window.addEventListener("keydown", handleKey);
    draw();

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{
        border: "2px solid white",
        display: "block",
        margin: "0 auto",
        background: "#f1f38b",
      }}
    />
  );
}