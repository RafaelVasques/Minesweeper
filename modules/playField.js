export default class PlayField {

    constructor(numberRolls, numberColumns, numberMines){

        this._rolls = numberRolls;
        this._columns = numberColumns;
        this._mines = numberMines;
        this._minesRevealed = false;
        this._allNodesRevealed = false;
        this._nodesRevealedCounter = 0;
        this._flagsCounter = 0;
        
        const _createEmptyPlayField = () => {
            
            let _emptyPlayField = [];
            for (let i = 0; i < this._rolls; i++) {        
            
                let line = [];
                for (let j = 0; j < this._columns; j++) {
                    let nodeContent = {content: 0, isRevealed: false, hasFlag: false};
                    line.push(nodeContent);
                };
                _emptyPlayField.push(line);
        
            }
    
            return _emptyPlayField;
            
        };

        this._dropMines = (_emptyPlayField) => {
        
            let distributedMines = 0;
            while (distributedMines < this._mines) {
                
                let y = Math.floor(Math.random() * this._rolls);
                let x = Math.floor(Math.random() * this._columns);
        
                if(_emptyPlayField[y][x].content !== "B"){
                    _emptyPlayField[y][x].content = "B";
                    distributedMines++;
                }
                
            }

            const _playFieldWithMines = _emptyPlayField;
            return _playFieldWithMines;
    
        };

        this._fillProximityValues = (_playFieldWithMines) => {

            const fillValues = (y,x,a,b) => { 
    
                if (_playFieldWithMines[y+a]?.[x+b] !== undefined){
                    if(_playFieldWithMines[y+a][x+b].content !== "B"){
                        _playFieldWithMines[y+a][x+b].content = _playFieldWithMines[y+a][x+b].content + 1;
                    };
                };
        
            };
            
            for (let i = 0; i < this._rolls; i++) {
                for (let j = 0; j < this._columns; j++){
                    if (_playFieldWithMines[i][j].content === "B"){
                        
                        let y = i;
                        let x = j;
                        for (let k = 1; k > -2; k--) {
                                
                            // +-y axis   3-4
                            fillValues(y,x,k,0);
        
                            // +-x axis
                            fillValues(y,x,0,k);
                                
                            // bottom and upper left, bottom and upper right
                            fillValues(y,x,k,-1);
                            fillValues(y,x,k,1);
        
                            k--;
                        };
                        
                    };
                };  
            };

            const _playField = _playFieldWithMines;
            return _playField;
    
        };

        const _playFieldWithMines = this._dropMines(_createEmptyPlayField());
        this._playField = this._fillProximityValues(_playFieldWithMines);

    };

    getFlagsLeft = () => this._mines - this._flagsCounter; // TEMP

    getRemainingBlocksToReveal(){

        const totalNodesToReveal = (this._rolls * this._columns) - this._mines;
        return totalNodesToReveal - this._nodesRevealedCounter;

    }; // TEMP

    getPlayField = () => this._playField;

    flagNode(htmlNode, flagHtmlNodeCallBack){
        
        const flagHtmlNode = flagHtmlNodeCallBack;
        const y = parseInt(htmlNode.dataset.y);
        const x = parseInt(htmlNode.dataset.x);

        if(
            this._playField[y][x].hasFlag === false &&
            this._playField[y][x].isRevealed === false
        ){
            // htmlNode.className = "node hide flag";
            this._playField[y][x].hasFlag = true;
            flagHtmlNode(htmlNode);
        }else if(this._playField[y][x].hasFlag === true){
            // htmlNode.className = "node hide";
            this._playField[y][x].hasFlag = false;
            flagHtmlNode(htmlNode);
        };

    };

    revealNodes(htmlNode, openHtmlNodeCallBack){

        const openHtmlNode = openHtmlNodeCallBack;
        const y = parseInt(htmlNode.dataset.y);
        const x = parseInt(htmlNode.dataset.x);
        const htmlNodeId = "y"+y + "x"+x;

        if(this._playField[y][x].hasFlag === false){
               
            if(this._playField[y][x].isRevealed === false){
    
                if(this._playField[y][x].content === 0){ // Flood Algorithm
                    
                    let stackNode = [y,x];
                    openHtmlNode(this._playField[y][x], htmlNodeId);

                    this._playField[y][x].isRevealed = true;
                    this._nodesRevealedCounter++
        
                    const emptyNodeRevealer = (i,j) => { 
                        
                        if(this._playField[stackNode[0]+i]?.[stackNode[1]+j] !== undefined){
                            
                            if(this._playField[stackNode[0]+i][stackNode[1]+j].content !== "B"){
                                
                                const htmlNodeId = "y"+(stackNode[0]+i) + "x"+(stackNode[1]+j);

                                if(
                                    this._playField[stackNode[0]+i][stackNode[1]+j].isRevealed === false &&
                                    this._playField[stackNode[0]+i][stackNode[1]+j].hasFlag === false
                                ){
                                    
                                    if(this._playField[stackNode[0]+i][stackNode[1]+j].content !== 0){
                                        
                                        this._playField[stackNode[0]+i][stackNode[1]+j].isRevealed = true;
                                        openHtmlNode(this._playField[stackNode[0]+i][stackNode[1]+j], htmlNodeId);
                                        this._nodesRevealedCounter++

                                    }else{

                                        stackNode.push(stackNode[0]+i, stackNode[1]+j);
                                        this._playField[stackNode[0]+i][stackNode[1]+j].isRevealed = true;
                                        openHtmlNode(this._playField[stackNode[0]+i][stackNode[1]+j], htmlNodeId);
                                        this._nodesRevealedCounter++

                                    };
        
                                };
                                
                            };
        
                        };
                        
                    };
        
                    while (stackNode.length !== 0) {
                        
                        for (let i = 1; i > -2; i--) {
                            
                            // +-y axis
                            emptyNodeRevealer(i,0);
        
                            // +-x axis
                            emptyNodeRevealer(0,i);
        
                            // bottom right and upper left
                            emptyNodeRevealer(i,i);
                                
                            // bottom left and upper right
                            emptyNodeRevealer(i,-1);
                            emptyNodeRevealer(i,1);
        
                            i--;
        
                        };
        
                        stackNode.shift();
                        stackNode.shift();
        
                    }; // End Flood Algorithm

                }else{
            
                    if(this._playField[y][x].content === "B"){
            
                        this._playField[y][x].isRevealed = true;
                        openHtmlNode(this._playField[y][x], htmlNodeId);
                        
                        for (let i = 0; i < this._rolls; i++) {
                            for (let j = 0; j < this._columns; j++) {
                                
                                const htmlNodeId = "y"+i + "x"+j;
                                if(this._playField[i][j].content === "B"){
                                    openHtmlNode(this._playField[y][x], htmlNodeId);
                                };
    
                            };
                        };
    
                    }else{

                        this._playField[y][x].isRevealed = true;
                        openHtmlNode(this._playField[y][x], htmlNodeId);
                        this._nodesRevealedCounter++

                    };
        
                };
    
            };
        
        };
        
    };

    reset(){

        for (let i = 0; i < this._rolls; i++) {        
            for (let j = 0; j < this._columns; j++) {
                this._playField[i][j] = {content: 0, isRevealed: false, hasFlag: false};
            };
        }

        this._fillProximityValues(
            this._dropMines(this._playField)
        );

    };

};