export function drawMap(ctx, map, tileSize) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];

      ctx.fillStyle = tile === 1 ? "#000000" : "#ebd281";
      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

export function drawObjects(ctx, player, flotador, goal, tileSize) {

  // Flotador (solo si existe)
  if (flotador) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      flotador.x * tileSize,
      flotador.y * tileSize,
      tileSize,
      tileSize
    );
  }

  // META
  ctx.fillStyle = "green";
  ctx.fillRect(
    goal.x * tileSize,
    goal.y * tileSize,
    tileSize,
    tileSize
  );

  // Jugador
  ctx.fillStyle = "red";
  ctx.fillRect(
    player.x * tileSize,
    player.y * tileSize,
    tileSize,
    tileSize
  );

  // UI
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  ctx.fillText(`Movimientos: ${player.moves} / ${player.maxMoves}`, 10, 25);
  ctx.fillText(`Flotadores: ${player.floats}`, 10, 50);

  // Perdiste
  if (player.moves >= player.maxMoves) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("¡Perdiste!", 150, 300);
  }

  // Nivel completado
  if (player.x === goal.x && player.y === goal.y) {
    ctx.fillStyle = "green";
    ctx.font = "30px Arial";
    ctx.fillText("¡Nivel completado!", 150, 300);
  }
}