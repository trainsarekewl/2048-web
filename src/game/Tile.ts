export class Tile {
    value: number;
    row: number;
    col: number;

    constructor(value: number, row: number, col: number) {
        this.value = value;
        this.row = row;
        this.col = col;
    }
}