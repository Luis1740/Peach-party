import { levels } from "./levels.jsx";

export let currentLevel = 0;

export function getCurrentLevel() {
  return levels[currentLevel];
}

export function nextLevel() {
  currentLevel++;

  if (currentLevel >= levels.length) {
    currentLevel = 0;
  }

  return levels[currentLevel];
}
