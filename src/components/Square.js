import React from "react";

const Square = ({ value, onClick, testId }) => {
  return (
    <div data-testid={testId} className={`Square ${value || ""}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
