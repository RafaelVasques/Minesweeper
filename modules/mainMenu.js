export default class MainMenu {

    constructor(difficulties){
        
        this.left = 0;

        const _createHtmlMainMenuArea = () => {

            let mainMenuArea = document.createElement('div');
            mainMenuArea.className = 'main__menu';

            let mainTitle = document.createElement('div');
            mainTitle.className = 'main__title';
            
            let title = document.createElement('p');
            title.className = 'title';
            title.innerHTML = 'Minesweeper';

            let autor = document.createElement('div');
            autor.className = 'autor';

            let autorName = document.createElement('p');
            autorName.innerHTML = 'By Rafael Vasques';

            let version = document.createElement('p');
            version.innerHTML = 'ver1.0';

            autor.appendChild(autorName);
            autor.appendChild(version);

            mainTitle.appendChild(title);
            mainTitle.appendChild(autor);

            mainMenuArea.appendChild(mainTitle);
            
            return mainMenuArea;
        };

        const _createDificultySelection = () => {

            let menuDifficultyArea = document.createElement('div');
            menuDifficultyArea.className = 'menu__difficulty';
    
            let menuBackwardArrow = document.createElement('img');
            menuBackwardArrow.className = 'menu__arrow backward__arrow';
            menuBackwardArrow.src = './images/arrow-01.svg';
    
            let menuForwardArrow = document.createElement('img');
            menuForwardArrow.className = 'menu__arrow';
            menuForwardArrow.src = './images/arrow-01.svg';
            
            let backwardButton = document.createElement('div');
            backwardButton.className = 'backward button';
    
            let forwardButton = document.createElement('div');
            forwardButton.className = 'forward button';

    
            let selectDifficulty = document.createElement('div');
            selectDifficulty.className = 'select__difficulty';
            
            let difficultyWrapper = document.createElement('div');
            difficultyWrapper.className = 'difficulty-wrapper';
    
            difficulties.map((difficulty) => {
                
                let difficultyBox = document.createElement('div');
                difficultyBox.className = 'difficulty__box';
                difficultyBox.dataset.id = 'difficultyBox';
                difficultyBox.dataset.difficulty = difficulty.difficulty;
    
                let difficultyName = document.createElement('p');
                difficultyName.className = 'difficulty '+ difficulty.difficulty;
                difficultyName.innerHTML = difficulty.name;
    
                let playFieldSize = document.createElement('p');
                playFieldSize.innerHTML = difficulty.playFieldYSize + 'x' + difficulty.playFieldXSize;
    
                let numberMines = document.createElement('p');
                numberMines.innerHTML = difficulty.mines + ' mines';
    
                difficultyBox.appendChild(difficultyName);
                difficultyBox.appendChild(playFieldSize);
                difficultyBox.appendChild(numberMines);
    
                difficultyWrapper.appendChild(difficultyBox);

            });
            
            selectDifficulty.appendChild(difficultyWrapper);
    
            backwardButton.appendChild(menuBackwardArrow);
            forwardButton.appendChild(menuForwardArrow);
            
            menuDifficultyArea.appendChild(backwardButton);
            menuDifficultyArea.appendChild(selectDifficulty);
            menuDifficultyArea.appendChild(forwardButton);

            const _moveDificultySelection = () => {
                
                forwardButton.addEventListener('click', () => {
                    
                    const amountOfDifficulties = difficultyWrapper.childElementCount;
                    const difficultyWrapperSize = -194 * amountOfDifficulties;
        
                    if(this.left > difficultyWrapperSize + 194){
                        difficultyWrapper.style.left = parseInt(this.left-194)+'px';
                        this.left = this.left-194;
                    };
            
                });

                backwardButton.addEventListener('click', ()=>{

                    if(this.left < 0){
                        difficultyWrapper.style.left = parseInt(this.left+194)+'px';
                        this.left = this.left+194;
                    };

                });
                
            };
            _moveDificultySelection();
    
            return menuDifficultyArea;
    
        };

        this._htmlMainMenuArea = _createHtmlMainMenuArea();
        this._dificultySelection = _createDificultySelection();
        
    };

    getElement = () => this._htmlMainMenuArea;

    show(){
        const container = document.querySelector('.container');
        container.appendChild(this._htmlMainMenuArea);
    };

    hide(){
        const container = document.querySelector('.container');
        container.removeChild(this._htmlMainMenuArea);
    };

    showDificultySelection(mainMenuElement){
        mainMenuElement.appendChild(this._dificultySelection);
    };

    hideDificultySelection(mainMenuElement){
        mainMenuElement.removeChild(this._dificultySelection);
    };

};