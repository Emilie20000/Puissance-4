import { Board } from './board.js';
import { Game } from './game.js';
import { Player } from './player.js';


document.addEventListener('DOMContentLoaded', function () {

    const playerChoiceContainer = document.createElement('div');

    playerChoiceContainer.innerHTML = `
    <div>
        <label for="player1Name">Nom du joueur 1 : </label>
        <input type="text" name="player1Name" id="player1Name" maxlength="10">
        <label for="player1Color">Couleur de jeu : </label>
        <select name="player1Color" id="player1Color">
            <option value="empty">--couleur 1--</option>
            <option value="red">rouge</option>
            <option value="yellow">jaune</option>
            <option value="blue">bleu</option>
            <option value="green">vert</option>
        </select>
    </div>
    <div>
        <label for="player2Name">Nom du joueur 2 : </label>
        <input type="text" name="player2Name" id="player2Name" maxlength="10">
        <label for="player2Color">Couleur de jeu : </label>
        <select name="player2Color" id="player2Color">
            <option value="empty">--couleur 2--</option>
            <option value="red">rouge</option>
            <option value="yellow">jaune</option>
            <option value="blue">bleu</option>
            <option value="green">vert</option>
        </select>
    </div>
    <div>
        <label for="columns">Nombre de colonnes : </label>
        <input type="number" name="columns" id="columns" value="6" min="4">

        <label for="rows">Nombre de lignes : </label>
        <input type="number" name="rows" id="rows" value="7" min="4">
    </div>
    <button id="startGameButton">Commencer à jouer</button>`;

    document.body.appendChild(playerChoiceContainer);
    playerChoiceContainer.classList.add('player-choice');
    playerChoiceContainer.id = 'playerChoice';


    const startGameButton = document.getElementById('startGameButton');

    startGameButton.addEventListener('click', () => {

        
        const player1NameInput = document.getElementById('player1Name');
        const player1Name = player1NameInput.value.trim() || 'Joueur 1';
        
        const player1ColorInput = document.getElementById('player1Color');
        let player1Color = player1ColorInput.value;

        if (player1Color === 'empty') {
            player1Color = 'red';
        }

        const player2NameInput = document.getElementById('player2Name');
        const player2Name = player2NameInput.value.trim() || 'Joueur 2';

        const player2ColorInput = document.getElementById('player2Color');
        let player2Color = player2ColorInput.value;

        if (player2Color === 'empty') {
            player2Color = 'yellow';
        }

        const numCols = parseInt(document.getElementById('columns').value);
        const numRows = parseInt(document.getElementById('rows').value);



        if (player1Name === player2Name) {
            alert('Les nom des joueurs ne peuvent pas être les mêmes');
            return false;
        }

        if (player1Color === player2Color) {
            alert('Les couleurs des joueurs ne peuvent pas être les mêmes');
            return false;
        }

        const boardContainer = document.getElementById('board');
        boardContainer.innerHTML = '';
        boardContainer.style.display = 'block';

        const playerChoiceContainer = document.getElementById('playerChoice');
        playerChoiceContainer.style.display = 'none';

        const board = new Board(boardContainer, numCols, numRows);

        const playersInfos = document.createElement('div');
        playersInfos.classList.add('players');
        playersInfos.id = 'players';
        document.body.appendChild(playersInfos);

        const player1 = new Player(1, player1Color, player1Name);
        const player2 = new Player(2, player2Color, player2Name);
     
        const player1Display = document.createElement('p');
        player1Display.textContent = player1Name;
        const player1ColorSpan = document.createElement('span');
        player1ColorSpan.classList.add('player-color');
        player1ColorSpan.style.backgroundColor = player1Color;
        player1Display.appendChild(player1ColorSpan);
        playersInfos.appendChild(player1Display);

        const player2Display = document.createElement('p');
        player2Display.textContent = player2Name;
        const player2ColorSpan = document.createElement('span');
        player2ColorSpan.classList.add('player-color');
        player2ColorSpan.style.backgroundColor = player2Color;
        player2Display.appendChild(player2ColorSpan);
        playersInfos.appendChild(player2Display);

        
        const game = new Game(board, player1, player2);
        
    });

});
