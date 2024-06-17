export class Victory {
    constructor(playerId, board, tokenCoordinates) {
        this.playerId = playerId;
        this.board = board;
        this.tokenCoordinates = tokenCoordinates;
    }

    checkForVictory(playerId) {
        
        if (this.checkHorizontal(playerId)) {
            return true;
        }
        
        if (this.checkVertical(playerId)) {
            return true;
        }
    
        if (this.checkDiagonalLeft(playerId)) {
           return true;
        }

        if (this.checkDiagonalRight(playerId)) {
            return true;
         }
    
        return false;
    }


    checkHorizontal(playerId) {
       
        for (let row = 0; row < this.board.numRows; row++) {
            for (let col = 0; col <= this.board.numCols - 4; col++) {
                let count = 0;

                for (let j = col; j < col + 4; j++) {
                    this.tokenCoordinates.forEach(coord => {
                        
                        if (coord.row === row && coord.col === j && coord.playerId === playerId) {
                            
                            count++;
                        }
                    });
                
                }

                if (count === 4) {
                    return true;
                }
             
            }

        }
        
        return false;
    }

    checkVertical(playerId) {

        for (let col = 0; col < this.board.numCols; col++) {
            for (let row = 0; row <= this.board.numRows - 4; row++) {
                let count = 0;

                for (let i = row; i < row + 4; i++) {
                    this.tokenCoordinates.forEach(coord => {

                        if (coord.row === i && coord.col === col && coord.playerId === playerId) {
                            
                            count++;
                        }

                    });
                }

                if (count === 4) {
                    return true;
                }
            }
        }

        return false;
    }

    checkDiagonalLeft(playerId) {

        for (let row = 0; row <= this.board.numRows - 4; row++) {
            for (let col = 0; col <= this.board.numCols - 4; col++) {
                let count = 0;

                for (let d = 0; d < 4; d++) {
                     const currentRow = row + d;
                    const currentCol = col + d;
                    this.tokenCoordinates.forEach(coord => {
                        if (coord.row === currentRow && coord.col === currentCol && coord.playerId === playerId) {
                            count++;
                        }
                    });
                }

                if (count === 4) {
                    return true;
                } 
                
            }
        }

        return false;
    }

    checkDiagonalRight(playerId) {

        for (let row = 0; row <= this.board.numRows - 4; row++) {
            for (let col = 0; col <= this.board.numCols; col++) {
                let count = 0;

                for (let d = 0; d < 4; d++) {
                     const currentRow = row + d;
                     const currentCol = col - d;
                    this.tokenCoordinates.forEach(coord => {
                        if (coord.row === currentRow && coord.col === currentCol && coord.playerId === playerId) {
                            count++;
                        }
                    });
                }

                if (count === 4) {
                    return true;
                } 
                
            }
        }

        return false;
    }
}