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
            this.board[r][c] = new Tile(r, c, 2);
        }

        else {
            this.board[r][c] = new Tile(r, c, 4);
        }
    }

    moveUp() {
        let moved = false;

        for (let r:number = 1; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                // check if the above spot is empty
                if (this.board[r - 1][c] === null && this.board[r][c] !== null) {
                    let k = r;
                    while (k > 0 && this.board[k-1][c] === null) {
                        this.board[k-1][c] = this.board[k][c];
                        this.board[k][c] = null;
                        k--;

                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    moveDown() {
        let moved = false;


        for (let r:number = this.size - 2; r >= 0; r--) {
            for (let c = 0; c < this.size; c++) {
                // check if the above below is empty
                if (this.board[r + 1][c] === null && this.board[r][c] !== null) {
                    let k = r;
                    while (k < 3 && this.board[k+1][c] === null) {
                        this.board[k+1][c] = this.board[k][c];
                        this.board[k][c] = null;
                        k++;

                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    moveRight() {
        let moved = false;

        for (let c = this.size - 2; c >= 0; c--) {
            for (let r = 0; r < this.size; r++) {
                // check if right side is empty
                if (this.board[r][c + 1] === null && this.board[r][c] !== null) {
                    let k = c;
                    while (k < this.size - 1 && this.board[r][k + 1] === null) {
                        this.board[r][k + 1] = this.board[r][k];
                        this.board[r][k] = null;
                        k++;

                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    moveLeft() {
        let moved = false;

        for (let c = 1; c < this.size; c++) {
            for (let r = 0; r < this.size; r++) {
                // check if left side is empty
                if (this.board[r][c - 1] === null && this.board[r][c] !== null) {
                    let k = c;
                    while (k > 0 && this.board[r][k - 1] === null) {
                        this.board[r][k - 1] = this.board[r][k];
                        this.board[r][k] = null;
                        k--;

                        moved = true;
                    }
                }
            }
        }

        return moved;
    }

    mergeUp() {
        let merged = false;

        for (let r = 1; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const current = this.board[r][c];
                const above = this.board[r - 1][c];

                if (
                    current !== null &&
                    above !== null &&
                    !current.merged &&
                    !above?.merged &&
                    current.getValue() === above.getValue()) {
                    this.board[r - 1][c] = new Tile(r - 1, c, current.getValue() * 2);

                    // clear tiles
                    this.board[r][c] = null;

                    this.score += current.getValue() * 2;

                    merged = true;
                }
            }
        }

        return merged;
    }

    mergeDown() {
        let merged = false;

        for (let r = this.size - 2; r >= 0; r--) {
            for (let c = 0; c< this.size; c++) {
                const current = this.board[r][c];
                const below = this.board[r + 1][c];

                if (
                    current !== null &&
                    below !== null &&
                    !current.merged &&
                    !below.merged &&
                    current.getValue() === below.getValue()) {
                    this.board[r + 1][c] = new Tile(r + 1, c, current.getValue() * 2);
                    this.board[r][c] = null;

                    this.score += current.getValue() * 2;

                    merged = true;
                }
            }
        }

        return merged;
    }

    mergeLeft() {
        let merged = false;

        for (let c = 1; c < this.size; c++) {
            for (let r = 0; r < this.size; r++) {
                const current = this.board[r][c];
                const left = this.board[r][c - 1];

                if (
                    current !== null &&
                    left !== null &&
                    !current.merged &&
                    !left.merged &&
                    current.getValue() === left.getValue()
                ) {
                    this.board[r][c - 1] = new Tile(r, c - 1, current.getValue() * 2);
                    this.board[r][c] = null;

                    this.score += current.getValue() * 2;

                    merged = true;
                }
            }
        }

        return merged;
    }

    mergeRight() {
        let merged = false;

        for (let c = this.size - 2; c >= 0; c--) {
            for (let r = 0; r < this.size; r++) {
                const current = this.board[r][c];
                const right = this.board[r][c + 1];

                if (
                    current !== null &&
                    right !== null &&
                    !current.merged &&
                    !right.merged &&
                    current.getValue() === right.getValue()
                ) {
                    this.board[r][c + 1] = new Tile(r, c + 1, current.getValue() * 2);
                    this.board[r][c] = null;

                    this.score += current.getValue() * 2;

                    merged = true;
                }
            }
        }

        return merged;
    }

    resetMergedStatus() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.board[r][c] !== null) {
                    this.board[r][c]?.resetMerged();
                }
            }
        }
    }

    turnUp() {
        let moved = this.moveUp();
        const merged = this.mergeUp()
        moved = moved || this.moveUp();

        this.resetMergedStatus();

        if (moved || merged) {
            this.addRandomTile();
            return true;
        }

        return false;
    }

    turnDown() {
        let moved = this.moveDown();
        const merged = this.mergeDown()
        moved = moved || this.moveDown();

        this.resetMergedStatus();

        if (moved || merged) {
            this.addRandomTile();
            return true;
        }

        return false;
    }

    turnLeft() {
        let moved = this.moveLeft();
        const merged = this.mergeLeft()
        moved = moved || this.moveLeft();

        this.resetMergedStatus();

        if (moved || merged) {
            this.addRandomTile();

            return true;
        }

        return false;
    }

    turnRight() {
        let moved = this.moveRight();
        const merged = this.mergeRight()
        moved = moved || this.moveRight();

        this.resetMergedStatus();

        if (moved || merged) {
            this.addRandomTile();

            return true;
        }

        return false;
    }
}