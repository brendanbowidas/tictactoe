import React, { useState, useMemo, useEffect } from "react";
import { Heading, Button } from "rebass";
import Square from "./Square";
import {
  checkWinnerVerticalAndHorizontal,
  checkWinnerDiagonal,
  pickRandomEmptySquare,
} from "../util";

function createGrid(n) {
  return new Array(n).fill(null).map(() => new Array(n).fill(null));
}

const Board = ({ numSquares, numPlayers, onGameWinner }) => {
  const [squareState, setSquareState] = useState([]);
  const [nextTurnIsX, setNextTurnIsX] = useState(true);

  const setupGrid = (squares) => {
    setSquareState(createGrid(squares));
  };

  useEffect(() => {
    resetGame();
  }, [numSquares]);

  const resetGame = () => {
    setupGrid(numSquares);
    setNextTurnIsX(true);
  };

  const hasWinner = useMemo(() => {
    const calculateWinner = () => {
      const valueToCheck = nextTurnIsX ? "O" : "X";

      return (
        checkWinnerVerticalAndHorizontal(squareState, valueToCheck) ||
        checkWinnerDiagonal(squareState, valueToCheck)
      );
    };

    return calculateWinner();
  }, [nextTurnIsX, squareState]);

  const currentTurn = nextTurnIsX ? "X" : "O";

  const winner = hasWinner && (nextTurnIsX ? "O" : "X");

  useEffect(() => onGameWinner(winner), [winner]);

  const isComputersMove = currentTurn === "O" && numPlayers === 1;

  const isDraw = useMemo(() => {
    return (
      squareState.flat().filter(Boolean).length === numSquares * numSquares
    );
  }, [squareState, numSquares]);

  const handleSquareClick = (row, column) => {
    if (!squareState[row][column] && !hasWinner) {
      const newState = [...squareState];
      newState[row][column] = nextTurnIsX ? "X" : "O";
      setSquareState(newState);
      setNextTurnIsX((prevValue) => !prevValue);
    }
  };

  const renderSquares = () => {
    return squareState.map((rowData, row) =>
      rowData.map((squareValue, column) => (
        <Square
          key={`${row}_${column}`}
          testId={`${row}_${column}`}
          onClick={() =>
            !isComputersMove ? handleSquareClick(row, column) : null
          }
          value={squareValue}
        />
      ))
    );
  };

  // computer makes move if single player
  useEffect(() => {
    setTimeout(() => {
      if (currentTurn === "O" && numPlayers === 1) {
        const nextMove = pickRandomEmptySquare(squareState);
        if (nextMove) {
          const [row, column] = nextMove.split("#");
          handleSquareClick(row, column);
        }
      }
    }, 1000);
  }, [currentTurn, numPlayers]);

  const renderHeading = () => {
    if (winner) {
      return `${winner} Wins!`;
    }
    if (isDraw) {
      return "Draw";
    }

    return `${currentTurn}'s Turn`;
  };

  return (
    <div>
      <Heading
        fontSize={[5, 6, 7]}
        py={3}
        className={`turn-display ${winner || currentTurn}`}
        textAlign="center"
      >
        {renderHeading()}
      </Heading>

      <div
        className="Board"
        style={{
          gridTemplateRows: `repeat(${numSquares}, max-content)`,
          gridTemplateColumns: `repeat(${numSquares}, max-content)`,
        }}
      >
        {renderSquares()}
      </div>

      <Button
        bg="var(--red)"
        mt={3}
        fontWeight="600"
        width={[1]}
        py={3}
        onClick={resetGame}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default Board;
