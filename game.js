console.log("hello world!");

let music = new Audio("music.mp3");
let aturn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let xScore = 0;
let oScore = 0;

const changeTurn = () => {
    turn = turn === "X" ? "0" : "X";
    return turn;
}

const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ];

    wins.forEach(e => {
        const [a, b, c] = e;
        if (boxtexts[a].innerText !== '' && boxtexts[a].innerText === boxtexts[b].innerText && boxtexts[a].innerText === boxtexts[c].innerText) {
            document.querySelector('.info').innerText = boxtexts[a].innerText + " WON";
            isgameover = true;
            gameover.play();
            document.querySelector('.boxim').style.width = "115px";
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;

            // Update the score
            if (boxtexts[a].innerText === "X") {
                xScore++;
                document.getElementById('x-score').innerText = xScore;
            } else {
                oScore++;
                document.getElementById('o-score').innerText = oScore;
            }
        }
    });

    if (!isgameover && Array.from(boxtexts).every(box => box.innerText !== '')) {
        document.querySelector('.info').innerText = "It's a Tie!";
        isgameover = true;
        gameover.play();
    }
}

// Game Logic

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            aturn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset functionality
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = '';
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.boxim').style.width = "0px";
    document.querySelector(".line").style.width = "0vw";
});

document.getElementById('sreset').addEventListener('click', () => {
    xScore = 0;
    oScore = 0;
    document.getElementById('x-score').innerText = xScore;
    document.getElementById('o-score').innerText = oScore;
});

//width: 51vw;
//transform: translate(12vw, 10vw) rotate(0deg);