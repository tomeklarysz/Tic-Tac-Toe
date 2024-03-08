let Gameboard = (function () {
  let gameboard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  return gameboard;
})();

const displayBoard = (() => {
  return () => {
    console.log('     A    B    C')
    for (let x in Gameboard) {
      console.log(x, Gameboard[x]);
    }
  };
})();

const clearBoard = () => {
  for (let i in Gameboard) {
    Gameboard[i].fill(' ');
  }
};

const start = document.getElementById('start');
start.style.filter = 'brightness(1)';
start.addEventListener('click', () => {
  if (start.style.filter === 'brightness(1)') {
    if (start.textContent === 'X starts') {
      start.textContent = 'O starts';
    } else {
      start.textContent = 'X starts';
    }
    displayTurn();
  }
});

const currentTurn = () => {
  let countX = 0;
  let countO = 0;
  for (let i in Gameboard) {
    for (let j in Gameboard[i]) {
      if (Gameboard[i][j] === 'X') {
        countX++;
      } else if (Gameboard[i][j] === 'O') {
        countO++;
      }
    }
  }
  if (start.textContent === 'X starts') {
    return countX <= countO ? 'X' : 'O';
  } else {
    return countX >= countO ? 'O' : 'X';
  }
};

// function to check if all elements from array are equal
const isEqual = (arr) => arr.every((val) => (val === arr[0]) && val !== ' ');

const isGameOver = () => {
  let diagonalDown = [];
  let diagonalUp = [];
  for (let x in Gameboard) {
    if (isEqual(Gameboard[x])) {
      return true;
    }
    let vertical = [];
    for (let i in Gameboard[x]) {
      vertical.push(Gameboard[i][x]);
      if (i === x) {
        diagonalDown.push(Gameboard[x][i]);
      }
      if ((Number(x) + Number(i)) === 2) {
        diagonalUp.push(Gameboard[x][i])
      }
    }
    if (isEqual(vertical)) {
      return true;
    }
  }
  if (isEqual(diagonalDown) || isEqual(diagonalUp)) {
    return true;
  }
  return false;
};

const canMove = (str) => str === ' ';

function createPlayer(name, marker = 'X') {
  let score = 0;
  const getScore = () => score;
  const addPoint = () => score++;
  const resetPoints = () => score = 0;
  const move = (column, row) => {
    if (canMove(Gameboard[column][row])) {
      Gameboard[column][row] = marker;
    }
  };
  return { name, marker, getScore, addPoint, resetPoints, move };
}

const updateScore = () => {
  const firstScore = document.getElementById('first-score');
  const secondScore = document.getElementById('second-score');
  if (currentTurn() === 'O') {
    player1.addPoint();
    firstScore.innerText = player1.getScore().toString();
  } else {
    player2.addPoint();
    secondScore.innerText = player2.getScore().toString();
  }
};

const displayTurn = () => {
  const turnPara = document.getElementById('turn');
  const firstName = document.getElementById('first-name');
  const secondName = document.getElementById('second-name');
  if (currentTurn() === 'X') {
    turnPara.innerText = `${firstName.textContent}'s turn`;
  } else {
    turnPara.innerText = `${secondName.textContent}'s turn`;
  }
};

const addBox = () => {
  const box = document.querySelector('.tic-box');
  for (let row in Gameboard) {
    for (let column in Gameboard[row]) {
      const p = document.createElement('div');
      p.setAttribute('class', `row-${row}`)
      p.addEventListener('click', () => {
        console.log(row);
        console.log(column);
        restartBtn.style.display = 'block';
        if (currentTurn() === 'X') {
          player1.move(row, column);
        } else {
          player2.move(row, column);
        }
        displayBoard();
        displayBox();
        displayTurn();
        start.style.filter = 'brightness(0)';
        if (isGameOver()) {
          gameOver();
        }
      });
      box.appendChild(p);
    }
  }
}

const gameOver = () => {
  updateScore();
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close');
  const scoreboard = document.getElementById('scoreboard');
  modal.style.display = 'block';
  scoreboard.style.filter = 'brightness(0)';
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    scoreboard.style.filter = 'brightness(1)';
    clearBoard();
    displayBoard();
    displayBox();
    displayTurn();
    restartBtn.style.display = 'none';
    start.style.filter = 'brightness(1)';
  });

  // show reset points button only when players have any points
  const reset = document.getElementById('reset');
  reset.style.display = 'block';
}

const displayBox = () => {
  const ticDivs = document.querySelector('.tic-box').querySelectorAll('div');
  const flatArr = Gameboard.flat();
  const arr = Array.from(ticDivs);
  arr.forEach((item, index) => {
    item.innerText = flatArr[index];
  })
}

const restartBtn = document.getElementById('restart');
restartBtn.addEventListener('click', () => {
  clearBoard();
  displayBoard();
  displayBox();
  displayTurn();
  restartBtn.style.display = 'none';
  start.style.filter = 'brightness(1)';
});

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
  player1.resetPoints();
  player2.resetPoints();
  const firstScore = document.getElementById('first-score');
  const secondScore = document.getElementById('second-score');
  firstScore.innerText = player1.getScore().toString();
  secondScore.innerText = player2.getScore().toString();
  reset.style.display = 'none';
});

const players = document.querySelectorAll('.name');
players.forEach((element) => element.addEventListener('click', () => {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}));

const play = () => {
  displayTurn();
  addBox();
  displayBoard();
  displayBox();
}

const player1 = createPlayer('tomek');
const player2 = createPlayer('opponent', 'O');

console.log({ 
  name: player1.name,
  marker: player1.marker,
  score: player1.getScore()
});

play();