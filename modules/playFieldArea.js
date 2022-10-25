export default class PlayFieldArea {
    
    constructor(){

        const _createGameArea = () => {

            const gameArea = document.createElement('div');
            gameArea.className = 'game__area';
            return gameArea

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
