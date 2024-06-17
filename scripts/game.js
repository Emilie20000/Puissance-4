import { Victory } from './victory.js';

export class Game {
    constructor(board, player1, player2) {
        this.board = board;
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        this.isAnimating = false;
        this.tokenCoordinates = [];
        this.clickHandler();
        this.initializeVictoryCheck(); 
    }

    initializeVictoryCheck() {
        this.victoryCheck = new Victory(null, this.board, this.tokenCoordinates);
    }

    clickHandler() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', (event) => this.cellClick(event));
        });
    } 

    cellClick(event) {
        if (this.isAnimating) {
            return false;
        }

        const cell = event.target;

        const col = parseInt(cell.dataset.col);
        const emptyCell = this.board.findEmptyCellInColumn(col);
        if (!emptyCell) {
            alert('La colonne est pleine');
            return;
        }

        this.isAnimating = true;
        this.createTokenAndMove(emptyCell);
    }

    createTokenAndMove(emptyCell) {
        const token = document.createElement('div');
        token.classList.add('token');
        token.style.backgroundColor = this.currentPlayer.color;
        token.style.width = '100px';
        token.style.height = '100px';
        token.style.borderRadius = '50%';
        token.style.position = 'absolute';
        token.style.left = emptyCell.offsetLeft + 'px'; 
        token.style.top = '-100px'; 
        document.body.appendChild(token);
        
        const moveTokenDown = () => {
            const currentTop = parseInt(token.style.top);
            const step = 5;
            
            if (currentTop >= emptyCell.offsetTop) { 
                token.style.top = emptyCell.offsetTop + 'px';
                emptyCell.dataset.state = this.currentPlayer.id;
                this.isAnimating = false;
    
                if (this.victoryCheck.checkForVictory(this.currentPlayer.id)) {
                   
                    alert(`Le joueur ${this.currentPlayer.name} a gagné !`);
                    this.updateScore(this.currentPlayer.id);
    
                    const restart = confirm(`Le joueur ${this.currentPlayer.name} a gagné ! Voulez-vous recommencer une partie ?`);
                    if (restart) {
                        this.resetGame();
                    } else {
                        location.reload();
                    }
                } else {
                    this.switchPlayer();
                }
            } else {
                token.style.top = (currentTop + step) + 'px';
                setTimeout(moveTokenDown, 10);
            }
        };

        moveTokenDown();

        const col = parseInt(emptyCell.dataset.col);
        const row = parseInt(emptyCell.dataset.row);
        const playerId = this.currentPlayer.id;
        this.tokenCoordinates.push({ row, col, playerId });
    }

    updateScore(playerId) {
        if (playerId === 1) {
            this.player1.score++;
        } else {
            this.player2.score++;
        }

        const playersInfos = document.getElementById('players');
        playersInfos.innerHTML = '';

        const player1Display = document.createElement('p');
        player1Display.textContent = this.player1.name;
        const player1ColorSpan = document.createElement('span');
        player1ColorSpan.classList.add('player-color');
        player1ColorSpan.style.backgroundColor = this.player1.color;
        player1Display.appendChild(player1ColorSpan);
        const player1ScoreSpan = document.createElement('span');
        player1ScoreSpan.textContent = this.player1.score;
        player1Display.appendChild(player1ScoreSpan);
        playersInfos.appendChild(player1Display);

        const player2Display = document.createElement('p');
        player2Display.textContent = this.player2.name;
        const player2ColorSpan = document.createElement('span');
        player2ColorSpan.classList.add('player-color');
        player2ColorSpan.style.backgroundColor = this.player2.color;
        player2Display.appendChild(player2ColorSpan);
        const player2ScoreSpan = document.createElement('span');
        player2ScoreSpan.textContent = this.player2.score;
        player2Display.appendChild(player2ScoreSpan);
        playersInfos.appendChild(player2Display);

    }

    switchPlayer() {

        this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    
    }

    resetGame() {
      
        this.tokenCoordinates = [];

        this.initializeVictoryCheck();

        const tokens = document.querySelectorAll('.token');
        tokens.forEach(token => token.remove());

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.dataset.state = 'empty';
        });

        this.currentPlayer = this.player1;
    }
}

         


