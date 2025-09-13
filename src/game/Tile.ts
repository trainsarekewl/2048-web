export class Tile {
    value: number;
    row: number;
    col: number;
    merged: boolean;

    constructor(value: number, row: number, col: number) {
        this.value = value;
        this.row = row;
        this.col = col;
        this.merged = false;
    }

    getValue() {
        return this.value;
    }

    resetMerged() {
        this.merged = false;
    }
}