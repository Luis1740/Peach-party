// Jugador
export const player = {
  x: 0,
  y: 0,
  moves: 0,
  maxMoves: 50,
  floats: 0,
};

// Meta
export let goal = {
  x: 0,
  y: 0,
};

// Flotador
export let flotador = {
  x: 0,
  y: 0,
};

// 🔥 Cargar nivel
export function loadLevel(level) {
  player.x = level.playerStart.x;
  player.y = level.playerStart.y;
  player.moves = 0;
  player.floats = 0;

  // ✅ maxMoves por nivel
  player.maxMoves = level.maxMoves || 50;

  goal.x = level.goal.x;
  goal.y = level.goal.y;

  flotador.x = level.flotador.x;
  flotador.y = level.flotador.y;
}

// Movimiento con deslizamiento
export function movePlayer(map, dx, dy) {
  if (player.moves >= player.maxMoves) return false;

  let newX = player.x;
  let newY = player.y;
  let moved = false;

  while (true) {
    const nextX = newX + dx;
    const nextY = newY + dy;

    // límites
    if (
      nextY < 0 ||
      nextY >= map.length ||
      nextX < 0 ||
      nextX >= map[0].length
    ) break;

    // pared
    if (map[nextY][nextX] === 1) break;

    newX = nextX;
    newY = nextY;
    moved = true;

    // flotador
    if (newX === flotador.x && newY === flotador.y) {
      player.floats += 1;

      // eliminar flotador
      flotador.x = -1;
      flotador.y = -1;
    }
  }

  if (moved) {
    player.x = newX;
    player.y = newY;
    player.moves++;
  }

  return moved;
}

// 🔄 Reiniciar nivel actual
export function resetPlayer(level) {
  loadLevel(level);
}