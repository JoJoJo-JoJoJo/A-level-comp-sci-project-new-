import Stack, { StackProps } from "../constants/classes/Stack";
import Vector from "../constants/classes/Vector";
import { MV_DIRS, OPP_WALLS, GRID_DIMENSIONS } from "../constants/constants";
import { CellProps } from "../constants/types";
import genInitGrid from "./genInitGrid";

// Need to define location of start/end pos elsewhere in code
function createMaze(
  cols: number,
  rows: number,
  vStart: Vector<2> = new Vector<2>([0, 0]),
): CellProps<typeof GRID_DIMENSIONS>[][] {
  const grid = genInitGrid(cols, rows);

  // Choose init cell, mark as visited and push to stack
  const initCell: CellProps<typeof GRID_DIMENSIONS> =
    grid[vStart.data[1]][vStart.data[0]];
  initCell.gen.isVisited = true;
  initCell.isPath = true;

  let stack: StackProps<CellProps<typeof GRID_DIMENSIONS>> = new Stack();
  stack.push(initCell);

  let curCell: CellProps<typeof GRID_DIMENSIONS> = initCell;

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
        "Stack was not empty - type of temp should not be undefined.",
      );
    }
    curCell = temp;

    // If current cell has any neighboring cells which have not been visited
    const curVector = curCell.gen.pos;
    let dirChoices = MV_DIRS;

    // Loop thru dirs + limit choices to available space in each dir
    for (const [dirKey, dirVector] of dirChoices) {
      const newVector =
        Vector.add<2>(dirVector, curVector) ?? new Vector<2>([0, 0]);
      if (
        isOutOfBounds(newVector) ||
        grid[newVector.data[1]][newVector.data[0]].gen.isVisited
      ) {
        dirChoices = dirChoices.filter((dir) => dir[0] !== dirKey);
      }
    }

    if (dirChoices.length !== 0) {
      stack.push(curCell);

      const [dirKey, dirVector] =
        dirChoices[Math.floor(Math.random() * dirChoices.length)];
      const newVector =
        Vector.add<2>(dirVector, curVector) ?? new Vector<2>([0, 0]);
      const nextCell = grid[newVector.data[1]][newVector.data[0]];

      curCell.gen.walls[dirKey] = false;

      nextCell.gen.walls[OPP_WALLS[dirKey]] = false;
      nextCell.gen.isVisited = true;
      stack.push(nextCell);
    }
  }

  return grid;
}

export default createMaze;
