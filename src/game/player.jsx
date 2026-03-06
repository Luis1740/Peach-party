// src/game/player.js
export const player = {
  x: 1,
  y: 1,
  moves: 0,
  maxMoves: 50,// Límite de movimientos
  floats : 0,
};

export const goal = {
  x: 14,
  y: 10
};

export const flotador = {
  x: 1,
  y: 10,
};
// retorna movimiento
export function movePlayer(map, dx, dy) {
  if (player.moves >= player.maxMoves) return false;

  let newX = player.x + dx;
  let newY = player.y + dy;

  // Límites del mapa
  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) return false;

  // Pared
  if (map[newY][newX] === 1) return false;

  // Si toca el flotador
  if (newX === flotador.x && newY === flotador.y) {
    player.floats += 1;

    // desaparecer flotador
    flotador.x = -1;
    flotador.y = -1;
  }

  player.x = newX;
  player.y = newY;
  player.moves++;

  return true;
}
// reinicia lvl
export function resetPlayer() {
  player.x = 1;
  player.y = 1;
  player.moves = 0;
  player.floats = 0;

  flotador.x = 1;
  flotador.y = 10;
}