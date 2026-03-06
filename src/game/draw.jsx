// src/game/draw.js
export function drawMap(ctx, map, tileSize) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];
      ctx.fillStyle = tile === 1 ? "#000000" : "#ebd281";
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

export function drawObjects(ctx, player, box, tileSize) {
  // Caja
  ctx.fillStyle = "pink";
  ctx.fillRect(box.x * tileSize, box.y * tileSize, tileSize, tileSize);

  // Jugador
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);

  // Contador de movimientos
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Movimientos: ${player.moves} / ${player.maxMoves}`, 10, 25);

  // Mensaje de fin
  if (player.moves >= player.maxMoves) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("¡Perdiste!", 150, 300);
  }
}