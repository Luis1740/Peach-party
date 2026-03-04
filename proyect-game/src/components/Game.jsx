import { useRef, useEffect } from "react";

export default function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const tileSize = 50;

    const player = {
      x: 3,
      y: 3,
    };
    const box = {
  x: 6,
  y: 3,
};
    const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
    function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {

      const tile = map[row][col];

      if (tile === 1) {
        ctx.fillStyle = "#444"; // pared
      } else {
        ctx.fillStyle = "#222"; // piso
      }

      ctx.fillRect(
        col * tileSize,
        row * tileSize,
        tileSize,
        tileSize
      );
    }
  }
}

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawMap();
        // Dibujar caja
    ctx.fillStyle = "brown";
    ctx.fillRect(
    box.x * tileSize,
    box.y * tileSize,
    tileSize,
    tileSize
    );
      // Dibujar jugador
      ctx.fillStyle = "Red";
      ctx.fillRect(
        player.x * tileSize,
        player.y * tileSize,
        tileSize,
        tileSize
      );

      requestAnimationFrame(draw);
    }

  
function handleKey(e) {
  let newX = player.x;
  let newY = player.y;

  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft") newX--;
  if (e.key === "ArrowRight") newX++;

  // Validar límites del mapa
  if (
    newY >= 0 &&
    newY < map.length &&
    newX >= 0 &&
    newX < map[0].length
  ) {

    // Si es pared → no hacer nada
    if (map[newY][newX] === 1) return;

    // Si el jugador intenta moverse donde está la caja
    if (newX === box.x && newY === box.y) {

      // Calcular nueva posición de la caja
      let boxNewX = box.x + (newX - player.x);
      let boxNewY = box.y + (newY - player.y);

      // Validar límites y paredes para la caja
      if (
        boxNewY >= 0 &&
        boxNewY < map.length &&
        boxNewX >= 0 &&
        boxNewX < map[0].length &&
        map[boxNewY][boxNewX] !== 1
      ) {
        // Mover caja
        box.x = boxNewX;
        box.y = boxNewY;

        // Mover jugador
        player.x = newX;
        player.y = newY;
      }

    } else {
      // Si no hay caja → mover normal
      player.x = newX;
      player.y = newY;
    }
  }
}

    window.addEventListener("keydown", handleKey);

    draw();

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
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