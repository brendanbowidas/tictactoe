import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "../components/Board";

describe("<Board />", () => {
  it("should display the winner at end of game", () => {
    const { getByTestId, getByText } = render(
      <Board numSquares={3} numPlayers={2} />
    );

    // X
    fireEvent.click(getByTestId("0_0"));

    // O
    fireEvent.click(getByTestId("1_2"));

    // X
    fireEvent.click(getByTestId("0_1"));

    // O
    fireEvent.click(getByTestId("2_1"));

    // X
    fireEvent.click(getByTestId("0_2"));

    expect(getByText("X Wins!")).toBeTruthy();
  });
});
