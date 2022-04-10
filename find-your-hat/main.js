const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {

    static generateField(height , width, holePercentage) {

        let field = [];
        for(let i = 0; i < height; i++) {
            field.push([]);
            for(let j = 0; j < width; j++) {
                field[i].push(fieldCharacter);
            }
        }

        if(holePercentage >= 0.6) {
            console.log("Making percentage lower or equal to 0.6");
            holePercentage = 0.3;
        }

        let numberOfHoles = Math.floor(holePercentage * (height * width));
        let holeCount = 0;
        let holePoints = [];

        while(holeCount < (numberOfHoles + 1)) {
            let row = Math.floor(Math.random() * height)
            let col = Math.floor(Math.random() * width)

            let isNewPosition = holePoints.every(point => {
               return (point.includes(row) && !point.includes(col))
                || (!point.includes(row) && point.includes(col))
                || (!point.includes(row) && !point.includes(col))
            })
    
            if((row !== 0 && col !== 0) && isNewPosition) {
                holePoints.push([row, col]);
                holeCount++;
                field[row][col] = hole;
                if(holeCount === numberOfHoles) {
                    field[row][col] = hat;
                }
            }

        }

        field[0][0] = pathCharacter;

        return new Field(field);
    }

    constructor(field) {
        this._field = field;
    }

    print() {
        this._field.forEach(row => {
            let line = row.reduce((acc, obj) => acc + obj, "");
            console.log(line);
        });
    }

    isOnField(row, col) {
        if(this._field[row][col] === undefined)
            return false;
        return true;
    }

    getItem(row, col) {
        return this._field[row][col];
    }

    updatePath(row, col) {
        this._field[row][col] = pathCharacter;
    }
}

const field = new Field([
    [pathCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole], 
    [hole, fieldCharacter, hole, fieldCharacter, hole],
    [hole, hole, fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter],
    [hole, hat, hole, hole, hole]]);


class Game {

    constructor(field) {
        this._field = field;
        this.colPos = 0;
        this.rowPos = 0;
        this.ongoing = true;
    }

    start() {

        let message;
        console.log('l = to move left, d = to move down, u = to move up, r = to move right');
        this._field.print();

        while(this.ongoing) {

            let direction = prompt("Which Way?");

            this.updatePosition(direction);

            let posOnField = this._field.isOnField(this.rowPos, this.colPos);

            if(!posOnField) {
                message = "You moved out of the farm."
                break;
            }

            let item = this._field.getItem(this.rowPos, this.colPos);

            if(item === hat) {
                message = "You won!"
                break;
            }

            if(item === hole) {
                message = "You fell into a hole";
                break;
            }

            this._field.updatePath(this.rowPos, this.colPos);
            this._field.print();
        }
        console.log(message);
    }

    updatePosition(direction) {
        switch(direction) {
            case 'r':
                this.colPos += 1;
                break;
            case 'u':
                this.rowPos -= 1;
                break;
            case 'd':
                this.rowPos += 1;
                break;
            case 'l':
                this.colPos -= 1;
                break;
        }
    }

}

let game = new Game(Field.generateField(9, 20, 0.5));
game.start();