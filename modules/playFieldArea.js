export default class PlayFieldArea {
    
    constructor(){

        const _createGameArea = () => {

            const gameAreaWrapper = document.createElement('div');
            gameAreaWrapper.className = 'game__area-wrapper';

            const gameArea = document.createElement('div');
            gameArea.className = 'game__area';

            gameAreaWrapper.appendChild(gameArea);

            return gameAreaWrapper

        };

        this._gameArea = _createGameArea();

    };

    show(){
        const container = document.querySelector('.container');
        container.appendChild(this._gameArea);
    };

    hide(){
        const container = document.querySelector('.container');
        container.removeChild(this._gameArea);
    };

};
