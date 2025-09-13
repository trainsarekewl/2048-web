import { Game } from "./Game";

let game = new Game(4);

console.log("Before turnUp:");
console.table(game.board);

game.turnUp();

console.log("After turnUp:");
console.table(game.board);