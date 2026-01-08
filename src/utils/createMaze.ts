import Stack, { StackProps } from "../constants/classes/Stack";
import Vector from "../constants/classes/Vector";
import { mvDirs, oppWalls, gridDimensions } from "../constants/constants";
import { CellProps } from "../constants/types";
import genInitGrid from "./genInitGrid";

// Need to define location of start/end pos elsewhere in code
function createMaze(
  cols: number,
  rows: number,
  vStart: Vector<2>
): CellProps<typeof gridDimensions>[][] {
  const grid = genInitGrid(cols, rows);

  // Choose init cell, mark as visited and push to stack
  const initCell: CellProps<typeof gridDimensions> =
    grid[vStart.data[1]][vStart.data[0]];
  initCell.gen.isVisited = true;

  let stack: StackProps<CellProps<typeof gridDimensions>> = new Stack();
  stack.push(initCell);

  let curCell: CellProps<typeof gridDimensions> = initCell;

  // Needs work to ensure proper type safety and valid i/o
  const isOutOfBounds = (vNew: Vector<2>): boolean =>
    vNew.data[0] < 0 ||
    vNew.data[0] >= rows ||
    vNew.data[1] < 0 ||
    vNew.data[1] >= cols;

  // While stack not empty
  while (stack.size > 0) {
    // Pop cell from stack + make it current cell
    const temp = stack.pop();
    if (typeof temp === "undefined") {
      throw new TypeError(
        "Stack was not empty - type of temp should not be undefined."
      );
    }
    curCell = temp;

    // If current cell has any neighboring cells which have not been visited
    const curVector = curCell.gen.pos;
    let dirChoices = mvDirs;

    // Loop thru dirs + limit choices to available space in each dir
    for (const [dirKey, dirVector] of dirChoices) {
      const newVector =
        Vector.add(curVector, dirVector) ?? new Vector<2>([0, 0]);
      if (
        isOutOfBounds(newVector) ||
        grid[newVector.data[1]][newVector.data[0]]
      ) {
        dirChoices = dirChoices.filter((dir) => dir[0] !== dirKey);
      }
    }

    if (dirChoices.length !== 0) {
      stack.push(curCell);

      const [dirKey, dirVector] =
        dirChoices[Math.floor(Math.random() * dirChoices.length)];
      const newVector = Vector.add(curVector, dirVector) ?? new Vector([0, 0]);
      const nextCell = grid[newVector.data[1]][newVector.data[0]];

      curCell.gen.walls[dirKey] = false;

      nextCell.gen.walls[oppWalls[dirKey]] = false;
      nextCell.gen.isVisited = true;
      stack.push(nextCell);
    }
  }

  console.table(grid);

  return grid;
}

export default createMaze;
