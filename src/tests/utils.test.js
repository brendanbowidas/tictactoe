import { checkWinnerVerticalAndHorizontal, checkWinnerDiagonal } from "../util";

describe("Utility functions", () => {
  describe("checkWinnerHorizontalAndVertical", () => {
    it("should detect n consecutive horizontal values on game board", () => {
      const gameBoard = [
        ["X", null, "O"],
        ["O", "O", "O"],
        ["X", "X", null],
      ];

      expect(checkWinnerVerticalAndHorizontal(gameBoard, "O")).toEqual(true);
      expect(checkWinnerVerticalAndHorizontal(gameBoard, "X")).toEqual(false);
    });

    it("should detect n consecutive vertical values on game board", () => {
      const gameBoard = [
        ["X", null, "O"],
        ["X", null, "O"],
        ["X", "X", null],
      ];

      expect(checkWinnerVerticalAndHorizontal(gameBoard, "X")).toEqual(true);
      expect(checkWinnerVerticalAndHorizontal(gameBoard, "O")).toEqual(false);
    });
  });

  describe("checkWinnerDiagonal", () => {
    it("should detect n consecutive diagonal values on game board", () => {
      const gameBoard = [
        ["X", "O", "O"],
        ["X", "X", "O"],
        ["O", "X", "X"],
      ];

      expect(checkWinnerDiagonal(gameBoard, "X")).toEqual(true);
      expect(checkWinnerDiagonal(gameBoard, "O")).toEqual(false);
    });
  });
});
