export class Board {
    constructor(container, numCols, numRows) {
        this.container = container;
        this.numCols = numCols;
        this.numRows = numRows;
        this.board = [];
        this.tokens = []; 
        this.createGrid();
    
    }

    createGrid() {
        
        this.container.style.display = 'grid';
        this.container.style.gridTemplateColumns = `repeat(${this.numCols}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${this.numRows}, 1fr)`;

        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.state = 'empty';
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.container.appendChild(cell);
            }
        }
    }

    findEmptyCellInColumn(col) {
        
        for (let row = this.numRows - 1; row >= 0; row--) {
            const cell = this.container.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (cell.dataset.state === 'empty') {
                return cell;
            }
        }
        return null;
    }
}


