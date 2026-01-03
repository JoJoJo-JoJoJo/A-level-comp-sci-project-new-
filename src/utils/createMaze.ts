import genInitGrid from "./genInitGrid";

function createMaze(cols: number, rows: number) {
  const grid = genInitGrid(cols, rows);
  // Need some location property for start and end of maze on cellProps
  // Maybe add random start/end pos?
  grid[0][0] = "start";
  grid[-1][-1] = "end";
}

export default createMaze;
