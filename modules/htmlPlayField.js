export default class HtmlPlayField {

    constructor(numberRolls, numberColumns){

        this._Rolls = numberRolls;
        this._Columns = numberColumns;
        this._htmlPlayFieldArea = document.querySelector('.play__field');

        const _createHtmlPlayField = () => {
            
            const htmlPlayField = document.createElement('div');
            htmlPlayField.className = 'play__field';

            for (let i = 0; i < this._Rolls; i++) {

                const line = document.createElement('div');
                line.className = 'line';
                
                for (let j = 0; j < this._Columns; j++) {
                    
                    const nodeHide = document.createElement('div');
                    nodeHide.className = 'node hide';
                    nodeHide.dataset.y = i;
                    nodeHide.dataset.x = j;
                    nodeHide.dataset.id = 'y'+i + 'x'+j;
            
                    line.appendChild(nodeHide);
        
                };

                htmlPlayField.appendChild(line)
                
            };

            return htmlPlayField;
        };

        this._htmlPlayField = _createHtmlPlayField();

    };

    show(){
        const playFieldArea = document.querySelector('.game__area');
        // const playFieldArea = document.querySelector('.container');
        playFieldArea.appendChild(this._htmlPlayField);
    };

    hide(){
        const playFieldArea = document.querySelector('.game__area');
        // const playFieldArea = document.querySelector('.container');
        playFieldArea.removeChild(this._htmlPlayField);
    };

    reset(){
        
        const nodes = document.querySelectorAll('.node');
        Array.from(nodes, (nodeElement) => {
            nodeElement.innerHTML = '';
            nodeElement.className = 'node hide';
        });

    };

    openHtmlNode(playFieldNode, htmlNodeId){

        const node = playFieldNode;
        const id = htmlNodeId;
        const proximityNumber = node.content;

        const nodeElement = document.querySelector('[data-id="'+ id + '"]');
        
        if(node.content !== "B"){
            
            if(node.content > 0){ 
                nodeElement.className = 'node revealed number' + proximityNumber;
                nodeElement.innerHTML = proximityNumber;
            }else{
                nodeElement.className = 'node revealed';
            };

        }else{
            nodeElement.className = "node revealed bomb";
        };

    };

    flagHtmlNode(htmlNode){
        
        const flagIsShow = htmlNode.classList.contains('flag');
        const isNodeHide = htmlNode.classList.contains('hide');

        if(flagIsShow === false && isNodeHide === true){
            htmlNode.classList.add('flag')
        }else{
            htmlNode.classList.remove('flag')
        };
        
    };

};