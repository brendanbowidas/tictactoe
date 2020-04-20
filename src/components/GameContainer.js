import React, { useState, useEffect } from "react";
import { Label, Select, Radio } from "@rebass/forms";
import { Box, Flex, Heading } from "rebass";
import Board from "./Board";

const BOARD_OPTIONS = [3, 4, 5, 6];

const GameContainer = () => {
  const [numSquares, setNumSquares] = useState(BOARD_OPTIONS[0]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("tictac_high_score") || 0
  );

  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("tictac_high_score", highScore);
    }
  }, [highScore]);

  const handleBoardResize = (e) => {
    setNumSquares(Number(e.target.value));
  };

  const handlePlayerSelect = (e) => {
    setNumPlayers(Number(e.target.value));
  };

  const handleGameWinner = (winner) => {
    if (winner === "X") {
      setHighScore((score) => score + 1);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading fontFamily="inherit" textAlign="center" mb={2}>
        High Score: {highScore}
      </Heading>
      <Board
        numSquares={numSquares}
        numPlayers={numPlayers}
        onGameWinner={handleGameWinner}
      />

      <Box mt={3} width="100%">
        <Label htmlFor="boardSize" py={2}>
          Board Size
        </Label>

        <Select
          id="boardSize"
          name="boardSize"
          value={numSquares}
          onChange={handleBoardResize}
        >
          {BOARD_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {`${option}x${option}`}
            </option>
          ))}
        </Select>
        <Flex mt={4} flexDirection="column" >
          <Label>
            <Radio
              name="players"
              value={1}
              checked={numPlayers === 1}
              onChange={handlePlayerSelect}
            />
            Single Player
          </Label>
          <Label mt={3}>
            <Radio
              name="players"
              value={2}
              checked={numPlayers === 2}
              onChange={handlePlayerSelect}
            />
            Multiplayer
          </Label>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GameContainer;
