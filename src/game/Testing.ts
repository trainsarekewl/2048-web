import { Game } from "./Game";

let game = new Game(4);

console.log("Before moveLeft:");
console.table(game.board);

game.moveLeft();

console.log("After moveLeft:");
console.table(game.board);