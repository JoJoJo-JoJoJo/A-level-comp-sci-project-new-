import Vector from "../constants/classes/Vector";
import { GRID_DIMENSIONS, INIT_CELL_STATE } from "../constants/constants";
import { CellProps } from "../constants/types";

//? This method generates a n-D array of cells, with each cell containing data of type 'CellProps<n>'
function genInitGrid(
  cols: number,
  rows: number,
): CellProps<typeof GRID_DIMENSIONS>[][] {
  const grid = [];

  for (let y = 0; y < rows; y++) {
    const row = [];

    for (let x = 0; x < cols; x++) {
      //? Ensure that cell data is in JSON object format before use
      const cell = JSON.parse(JSON.stringify(INIT_CELL_STATE));
      cell.gen.pos = new Vector<2>([x, y]);
      row.push(cell);
    }

    grid.push(row);
  }

  return grid;
}

export default genInitGrid;

// COL - x, ROW - y
/**
 *   COL COL COL COL
 *    |   |   |   |
 * [
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 * ]
 *
 * [x, y] => [COL, ROW]
 */
