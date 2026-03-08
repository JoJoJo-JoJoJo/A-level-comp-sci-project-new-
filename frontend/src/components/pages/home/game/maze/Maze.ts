import { GAME_HEIGHT } from "../../../../../constants/constants";
import { CellProps } from "../../../../../constants/types";
import Component from "../../../../Component";
import { div, ul } from "../../../../htmlElementsArtificial";
import { Cell } from "./Cell";
import "./styles.css";

export class Maze extends Component {
  constructor(grid: CellProps<2>[][], order: [cols: number, rows: number]) {
    super();

    //? Initialize cell instances on construction
    const cellInstances: Cell[][] = grid.map((row, i) =>
      row.map(
        (tile, j) =>
          new Cell(
            `row_${i}_tile${j}`,
            tile,
            `${(GAME_HEIGHT * (order[0] as number)) / (order[1] as number) ** 2}px`,
          ),
      ),
    );

    this.setState({ grid, order, cellInstances });
  }

  override render(): HTMLElement {
    const [cols, rows] = this.state.order;

    //? Check if grid dimensions have changed
    const dimensionsMismatch =
      this.state.cellInstances.length !== this.state.grid.length ||
      this.state.cellInstances[0]?.length !== this.state.grid[0].length;

    if (dimensionsMismatch) {
      //? Create new cell instances if dimensions changed
      const cellInstances = this.state.grid.map(
        (row: CellProps<2>[], i: number) =>
          row.map(
            (tile, j) =>
              new Cell(
                `row_${i}_tile${j}`,
                tile,
                `${(GAME_HEIGHT * (cols as number)) / (rows as number) ** 2}px`,
              ),
          ),
      );
      this.state.cellInstances = cellInstances;
    } else {
      //? Same dimensions: sync existing cells with updated grid data
      this.state.grid.forEach((row: CellProps<2>[], i: number) => {
        row.forEach((tile: CellProps<2>, j: number) => {
          const cell = this.state.cellInstances[i][j];
          if (cell) {
            const borders: [string, boolean][] = Object.entries(
              tile.gen.walls,
            ).filter(([_, v]) => v === true);
            cell.state.borders = borders;
            cell.state.isPath = tile.isPath;
          }
        });
      });
    }

    return div(
      {
        class: "maze-wrapper",
        id: "mazeContainer",
        style: `height: ${GAME_HEIGHT + 10}px; width: ${(cols / rows) * GAME_HEIGHT + 10}px`,
      },
      ul(
        { class: "rows" },
        ...this.state.cellInstances.map((row: Cell[], i: number) =>
          ul(
            {
              class: "row",
              id: `row_${i}`,
              style: `height: ${GAME_HEIGHT / rows}px`,
            },
            ...row.map((cell: Cell) => cell),
          ),
        ),
      ),
    );
  }
}
