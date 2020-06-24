const winningcombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const grid = Array.from(document.getElementsByClassName('q'));
const qNumId = (ele) => Number.parseInt(ele.id.replace("q"," "));
const emptyQs = () => grid.filter(_qEl => _qEl.innerText === '');
const allsame = (arr) => arr.every(ele => ele.innerText === arr[0].innerText && ele.innerText !== '');

const taketurn =(index,letter) => grid[index].innerText = letter;
const opponentchoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const endGame = (winningSequence) =>{
    console.log("Okay game ended ");
    winningSequence.forEach(ele => ele.classList.add('winner'));
    disableListeners();
};

const checkforVictory = () => {
    let victory = false;
    winningcombos.forEach(_c => {
        const _grid = grid;
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(allsame(sequence)) {
            victory = true;
            endGame(sequence);
            if(_grid[_c[0]].innerText === 'x')
                {
                    var x = document.getElementById("x").innerText = "The Winner is 'X'";
                }
            if(_grid[_c[0]].innerText === 'o')
                {
                    var o = document.getElementById("o").innerText = "The winner is 'O'";
                }
        }
    });
    return victory;
};

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        taketurn(opponentchoice(), 'o');
        if(!checkforVictory())
            enableListeners();
    }, 1000);
};
const clickfn = ($event) => {
    taketurn(qNumId($event.target), 'x');
    if(!checkforVictory())
        opponentTurn();
    

};
const enableListeners = () => grid.forEach(item => item.addEventListener('click',clickfn));
const disableListeners = () => grid.forEach(item => item.removeEventListener('click', clickfn));

enableListeners();