import { Tile } from "./Tile.ts"

export class Game {
    size: number;
    board: (Tile | null)[][]
    score: number;

    constructor(size = 4) {
        this.size = size;
        this.score = 0;
        this.board = Array.from({ length: size }, () => Array(size).fill(null));

        this.addRandomTile();
        this.addRandomTile();
    }

    addRandomTile() {
        const empty = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] === null) { empty.push({r, c})}
            }
        }

        const { r, c } = empty[Math.floor(Math.random() * empty.length)];

        if (Math.random() < 0.9) {
            this.board[r][c] = new Tile(2, r, c);
        }

        else {
            this.board[r][c] = new Tile(4, r, c);
        }
    }

    moveUp() {
        for (let r:number = 1; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                // check if the above spot is empty
                if (this.board[r - 1][c] === null && this.board[r][c] !== null) {
                    let k = r;
                    while (k > 0 && this.board[k-1][c] === null) {
                        this.board[k-1][c] = this.board[k][c];
                        this.board[k][c] = null;
                        k--;
                    }
                }
            }
        }
    }

    moveDown() {
        for (let r:number = this.size - 2; r >= 0; r--) {
            for (let c = 0; c < this.size; c++) {
                // check if the above below is empty
                if (this.board[r + 1][c] === null && this.board[r][c] !== null) {
                    let k = r;
                    while (k < 3 && this.board[k+1][c] === null) {
                        this.board[k+1][c] = this.board[k][c];
                        this.board[k][c] = null;
                        k++;
                    }
                }
            }
        }
    }

    moveRight() {
        for (let c = this.size - 2; c >= 0; c--) {
            for (let r = 0; r < this.size; r++) {
                // check if right side is empty
                if (this.board[r][c + 1] === null && this.board[r][c] !== null) {
                    let k = c;
                    while (k < this.size - 1 && this.board[r][k + 1] === null) {
                        this.board[r][k + 1] = this.board[r][k];
                        this.board[r][k] = null;
                        k++;
                    }
                }
            }
        }
    }

    moveLeft() {
        for (let c = 1; c < this.size; c++) {
            for (let r = 0; r < this.size; r++) {
                // check if left side is empty
                if (this.board[r][c - 1] === null && this.board[r][c] !== null) {
                    let k = c;
                    while (k > 0 && this.board[r][k - 1] === null) {
                        this.board[r][k - 1] = this.board[r][k];
                        this.board[r][k] = null;
                        k--;
                    }
                }
            }
        }
    }
}