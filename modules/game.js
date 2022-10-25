export default class Game {

    constructor(numberRolls, numberColumns, numberBombs, playField){

        this._rolls = numberRolls;
        this._columns = numberColumns;
        this._bombs = numberBombs;
        this._playField = playField;
        this._minutes = 0;
        this._seconds = 0;
        this._timer = '';

        this._flagsLeftElement = document.querySelector('.flagsLeftCounter');
        this._flagsLeftElement.innerHTML = this._bombs;

    };

    gameOverChecker(playField){

        let remainingBlocksToReveal = (this._rolls * this._columns) - this._bombs;
        for (let i = 0; i < this._rolls; i++) {
            
            for (let j = 0; j < this._columns; j++) {
                
                if(
                    playField[i][j].content === 'B' &&
                    playField[i][j].isRevealed === true
                ){

                    return [true, 'loose'];

                }else if(playField[i][j].isRevealed === true){

                    remainingBlocksToReveal--;
                    if(remainingBlocksToReveal === 0){
                        return [true, 'win'];
                    };

                };

            };
            
        };

        return [false, '']
        
    };

    startTimeCounter(){
        
        const timerArea = document.querySelector('.timer');
        const timerCounter = () => {
            if(this._seconds === 60){
                this._minutes++
                this._seconds = 0;
            };
            timerArea.innerHTML = this._minutes.toString().padStart(2, '0') +':'+ this._seconds.toString().padStart(2, '0');
            this._seconds++;
        }
        this._timer = setInterval(timerCounter, 1000);

    };

    resetTimerCounter(){
        this._minutes = 0;
        this._seconds = 0;
    };

    stopTimerCounter(){
        clearInterval(this._timer);
    };

    flagsLeftUpdater(){

        let flagsLeft = this._bombs;
        this._playField.map((line) => {
            
            line.map((node) =>{
                if(node.hasFlag === true){
                    flagsLeft--;
                };
            });
            

        });
        this._flagsLeftElement.innerHTML = flagsLeft;

    };

    getNumberFlagsLeft(){
        return this._flagsLeftElement.innerHTML
    };

};