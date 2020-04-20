function insertMatch(lookup, rowOrCol) {
  if (!lookup.hasOwnProperty(rowOrCol)) {
    lookup[rowOrCol] = 1;
  } else {
    lookup[rowOrCol] += 1;
  }
}

export const checkWinnerVerticalAndHorizontal = (arr, target) => {
  const horizontalMatches = {};

  const verticalMatches = {};

  let result = false;

  for (let col = 0, len = arr.length; col < len; col++) {
    for (let row = 0, len = arr.length; row < len; row++) {
      if (arr[row][col] === target) {
        insertMatch(verticalMatches, col);
        insertMatch(horizontalMatches, row);
      }
      if (
        verticalMatches[col] === arr.length ||
        horizontalMatches[row] === arr.length
      ) {
        result = true;
      }
    }
  }
  return result;
};

export const checkWinnerDiagonal = (arr, target, bottomToTop) => {
  for (let i = 0, len = arr.length; i <= 2 * (len - 1); i++) {
    const diagonalGroup = [];

    const match = new Array(arr.length).fill(target).join("");

    for (let n = len - 1; n >= 0; n--) {
      const x = i - (bottomToTop ? len - n : n);
      if (x >= 0 && x < len) {
        diagonalGroup.push(arr[n][x]);
      }
    }

    if (diagonalGroup.length > 0) {
      const groupString = diagonalGroup.join("");
      if (groupString === match) {
        return true;
      }
    }
  }

  if (bottomToTop) {
    return false;
  }

  return checkWinnerDiagonal(arr, target, true);
};

export const pickRandomEmptySquare = (arr) => {
  let empties = [];

  for (let col = 0, len = arr.length; col < len; col++) {
    for (let row = 0, len = arr.length; row < len; row++) {
      if (arr[row][col] === null) {
        empties.push(`${row}#${col}`);
      }
    }
  }

  return empties[Math.floor(Math.random() * empties.length)];
};
