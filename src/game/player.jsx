// src/game/player.js
export const player = {
  x: 1,
  y: 1,
  moves: 0,
  maxMoves: 50, // Límite de movimientos
};

export const box = {
  x: 1,
  y: 10,
};

// Retorna true si hubo movimiento
export function movePlayer(map, dx, dy) {
  if (player.moves >= player.maxMoves) return false;

  let newX = player.x + dx;
  let newY = player.y + dy;

  // Límites del mapa
  if (newY < 0 || newY >= map.length || newX < 0 || newX >= map[0].length) return false;

  // Pared
  if (map[newY][newX] === 1) return false;

  // Si hay caja
  if (newX === box.x && newY === box.y) {
    let boxNewX = box.x + dx;
    let boxNewY = box.y + dy;

    if (
      boxNewY >= 0 &&
      boxNewY < map.length &&
      boxNewX >= 0 &&
      boxNewX < map[0].length &&
      map[boxNewY][boxNewX] !== 1
    ) {
      box.x = boxNewX;
      box.y = boxNewY;
      player.x = newX;
      player.y = newY;
      player.moves++;
      return true;
    }
    return false;
  } else {
    player.x = newX;
    player.y = newY;
    player.moves++;
    return true;
  }
}

// Reiniciar nivel
export function resetPlayer() {
  player.x = 1;
  player.y = 1;
  player.moves = 0;
  box.x = 5;
  box.y = 3;
}