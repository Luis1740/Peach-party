export function drawMap(ctx, map, tileSize) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];

      // Colores más visibles
      if (tile === 1) {
        ctx.fillStyle = "#333"; // pared
      } else {
        ctx.fillStyle = "#87CEEB"; // suelo (celeste tipo agua)
      }

      ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

      // 🔥 borde para ver la grilla
      ctx.strokeStyle = "#000";
      ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}

export function drawObjects(ctx, player, flotador, goal, tileSize) {

  // 🟡 Flotador (solo si existe)
  if (flotador.x >= 0 && flotador.y >= 0) {
    ctx.fillStyle = "#ffff00";
    ctx.fillRect(
      flotador.x * tileSize,
      flotador.y * tileSize,
      tileSize,
      tileSize
    );
  }

  // 🟢 META
  ctx.fillStyle = "#00ff88";
  ctx.fillRect(
    goal.x * tileSize,
    goal.y * tileSize,
    tileSize,
    tileSize
  );

  // 🔴 Jugador
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(
    player.x * tileSize,
    player.y * tileSize,
    tileSize,
    tileSize
  );

  // 🧠 UI
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Movimientos: ${player.moves} / ${player.maxMoves}`, 10, 25);
  ctx.fillText(`Flotadores: ${player.floats}`, 10, 50);

  // ❌ Perdiste
  if (player.moves >= player.maxMoves) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("¡Perdiste!", 150, 300);
  }

  // 🏁 Ganaste
  if (player.x === goal.x && player.y === goal.y) {
    ctx.fillStyle = "lime";
    ctx.font = "30px Arial";
    ctx.fillText("¡Nivel completado!", 150, 300);
  }
}