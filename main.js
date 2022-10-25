import Game from './modules/game.js';
import PlayField from './modules/playField.js';
import HtmlPlayField from './modules/htmlPlayField.js';
import MainMenu from './modules/mainMenu.js';
import GameMenu from './modules/gameMenu.js';
import PlayFieldArea from './modules/playFieldArea.js';
import { difficulties } from './modules/difficulties.js';

(function(){

    const mainMenu = new MainMenu(difficulties);

    function startMatch(numberRolls, numberColumns, numberMines) {

        const rolls = numberRolls;
        const columns = numberColumns;
        const mines = numberMines;
        let isGameOver = [false, ''];
        
        const gameMenu = new GameMenu();
        gameMenu.show();
        gameMenu.showPlayFieldSize(rolls, columns);
        gameMenu.showGameControls();

        const playFieldArea = new PlayFieldArea();
        playFieldArea.show();
        
        const htmlPlayField = new HtmlPlayField(rolls, columns);
        htmlPlayField.show();

        const playField = new PlayField(rolls, columns, mines);
        const game = new Game(rolls, columns, mines, playField.getPlayField());        
        game.startTimeCounter();
                
        function nodeClickHandler(playField){
            
            const htmlPlayFieldNodes = document.querySelectorAll('.node');
            htmlPlayFieldNodes.forEach(htmlNode => {
                           
                htmlNode.addEventListener('click', () => {

                    if(isGameOver[0] === false){
                        playField.revealNodes(htmlNode, htmlPlayField.openHtmlNode);
                        isGameOver = game.gameOverChecker(playField.getPlayField());
                    };

                    if(isGameOver[1] === 'win'){
                        game.stopTimerCounter();
                        gameMenu.showWinMessage();
                    }else if(isGameOver[1] === 'loose'){
                        game.stopTimerCounter();
                        gameMenu.showLooseMessage();
                    };

                });
        
                htmlNode.addEventListener('contextmenu', (e) => {
                    
                    e.preventDefault();
                    if(isGameOver[0] === false){

                        let flagsLeft = game.getNumberFlagsLeft();

                        if(flagsLeft > 0){
                            playField.flagNode(htmlNode, htmlPlayField.flagHtmlNode);
                            game.flagsLeftUpdater();
                        };
                        
                    };

                });
        
            });
    
        };
        nodeClickHandler(playField);

        function menuOptionsClickHandler(){
            
            const restartButton = document.querySelector('.button__restart');
            restartButton.addEventListener('click', () => {
                playField.reset();
                htmlPlayField.reset();
                game.resetTimerCounter();
                game.flagsLeftUpdater();
                
                if(isGameOver[0] !== false){
                    if(isGameOver[1] === 'loose'){
                        gameMenu.hideLooseMessage();
                        game.startTimeCounter();
                    }else{
                        gameMenu.hideWinMessage();
                        game.startTimeCounter();
                    };
                };

                isGameOver = [false, ''];
            });

            const backToMainMenuButton = document.querySelector('.home');
            backToMainMenuButton.addEventListener('click', () => {
                gameMenu.hide();
                // htmlPlayField.hide();
                playFieldArea.hide();
                mainMenu.show();
            });

        };
        menuOptionsClickHandler();
        
    };

    function openMainMenu() {
    
        mainMenu.show();
        const mainMenuArea = mainMenu.getElement();
        mainMenu.showDificultySelection(mainMenuArea);
    
        difficulties.map((difficulty) => {

            const gameSelection = document.querySelector('[data-difficulty="'+ difficulty.difficulty +'"]');
            gameSelection.addEventListener('click', ()=> {
    
                const rolls = difficulty.playFieldYSize;
                const columns = difficulty.playFieldXSize;
                const mines = difficulty.mines;
                
                mainMenu.hide();
                startMatch(rolls, columns, mines);
        
            });

        });
    
    };

    document.addEventListener("DOMContentLoaded", function() {
        openMainMenu();
    });

})();
