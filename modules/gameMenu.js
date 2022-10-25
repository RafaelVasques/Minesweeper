export default class GameMenu {
    
    constructor(){

        const _createHtmlGameMenuArea = () => {

            const gameMenuArea = document.createElement('header');
            gameMenuArea.className = 'game__menu';

            const gameMenuHeader = document.createElement('div');
            gameMenuHeader.className = 'game__menu-header';

            const gameName = document.createElement('div');
            gameName.innerHTML = 'Minesweeper by Rafael Vasques';

            const version = document.createElement('span');
            version.className = 'version';
            version.innerHTML = 'ver1.0';

            // const playFieldSize = document.createElement('div');
            // playFieldSize.innerHTML = '19x16 Playfield';

            gameName.appendChild(version);
            gameMenuHeader.appendChild(gameName);
            // gameMenuHeader.appendChild(playFieldSize);

            gameMenuArea.appendChild(gameMenuHeader);
            return gameMenuArea;

        };

        const _createHtmlPlayFieldSize = () => {
            const playFieldSize = document.createElement('div');
            // playFieldSize.innerHTML = '19x16 Playfield';

            return playFieldSize;
        };

        const _createHtmlGameControls = () => {

            const gameControlsArea = document.createElement('div');
            gameControlsArea.className = 'game__controls';

            const gameInfo = document.createElement('div');
            gameInfo.className = 'game__info';

            const flagsLeftBox = document.createElement('div');
            flagsLeftBox.className = 'flags__left info__box';

            const divFlags = document.createElement('div');

            const flagsLeftCounter = document.createElement('div');
            flagsLeftCounter.className = 'flagsLeftCounter';
            flagsLeftCounter.innerHTML = '00';

            const flag = document.createElement('img');'./images/flag.svg';
            flag.src = './images/flag.svg';

            const timerBox = document.createElement('div');
            timerBox.className = 'timer info__box';
            timerBox.innerHTML = '00:00';

            const controls = document.createElement('div');
            controls.className = 'controls';

            const restartButton = document.createElement('div');
            restartButton.className = 'button__restart button';
            restartButton.innerHTML = 'restart';

            const homeButton = document.createElement('div');
            homeButton.className = 'home button';

            const homeButtonImg = document.createElement('img');
            homeButtonImg.src = './images/home.svg';

            divFlags.appendChild(flag);
            divFlags.appendChild(flagsLeftCounter);
            flagsLeftBox.appendChild(divFlags);

            gameInfo.appendChild(flagsLeftBox);
            gameInfo.appendChild(timerBox);

            controls.appendChild(restartButton);
            homeButton.appendChild(homeButtonImg);
            controls.appendChild(homeButton);

            gameControlsArea.appendChild(gameInfo);
            gameControlsArea.appendChild(controls);

            return gameControlsArea;

        };

        const _createHtmlLooseMessage = () => {
            const gameStatus = document.createElement('div');
            gameStatus.className = 'game__status-loose info__box';
            gameStatus.innerHTML = 'You Loose!';

            return gameStatus;
        };

        const _createHtmlWinMessage = () => {
            const gameStatus = document.createElement('div');
            gameStatus.className = 'game__status-win info__box';
            gameStatus.innerHTML = 'You Win!';

            return gameStatus;
        };

        this._htmlGameMenuArea = _createHtmlGameMenuArea();
        this._gameControlsArea = _createHtmlGameControls();

        this._htmlPlayFieldSize = _createHtmlPlayFieldSize();

        this._htmlLooseMessage = _createHtmlLooseMessage();
        this._htmlWinMessage = _createHtmlWinMessage();

    };

    show(){
        const container = document.querySelector('.container');
        container.appendChild(this._htmlGameMenuArea);
    };

    hide(){
        const container = document.querySelector('.container');       
        container.removeChild(this._htmlGameMenuArea);
    };

    showPlayFieldSize(yAxis, xAxis){
        const gameMenuHeader = document.querySelector('.game__menu-header')
        this._htmlPlayFieldSize.innerHTML = yAxis + 'x' + xAxis + ' Playfield';
        gameMenuHeader.appendChild(this._htmlPlayFieldSize);
    };

    hidePlayFieldSize(){
        this._htmlGameMenuArea.removeChild(this._htmlPlayFieldSize);
    };

    showGameControls(){
        const gameMenu = document.querySelector('.game__menu');
        gameMenu.appendChild(this._gameControlsArea);
    };

    hideGameControls(){
        const gameMenu = document.querySelector('.game__menu');
        gameMenu.removeChild(this._gameControlsArea);
    };

    showLooseMessage(){
        const gameInfo = document.querySelector('.game__info');
        gameInfo.appendChild(this._htmlLooseMessage);
    };

    hideLooseMessage(){
        const gameInfo = document.querySelector('.game__info');
        gameInfo.removeChild(this._htmlLooseMessage);
    };

    showWinMessage(){
        const gameInfo = document.querySelector('.game__info');
        gameInfo.appendChild(this._htmlWinMessage);
    };

    hideWinMessage(){
        const gameInfo = document.querySelector('.game__info');
        gameInfo.removeChild(this._htmlWinMessage);
    };

};
