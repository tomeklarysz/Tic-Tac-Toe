let Gameboard = (function () {
  let gameboard = [['O', ' ', 'O'], ['X', ' ', ' '], ['O', 'X', ' ']];
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
displayBoard();

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
}

function createPlayer(name, marker = 'X') {
  let score = 0;
  const getScore = () => score;
  const addPoint = () => score++;
  const move = (column, row) => {
    switch (column) {
      case 'A':
        column = 0;
        break;
      case 'B':
        column = 1;
        break;
      case 'C':
        column = 2;
        break;
      default:
        throw new Error('No such column');
    }
    Gameboard[column][row] = marker;
  };
  return { name, marker, getScore, addPoint, move };
}

const player1 = createPlayer('tomek');
player1.addPoint();
try {
  player1.move('A', 0);
} catch (e) {
  console.error(e);
}
console.log({ 
  name: player1.name,
  marker: player1.marker,
  score: player1.getScore()
});

console.log(isGameOver());
displayBoard();