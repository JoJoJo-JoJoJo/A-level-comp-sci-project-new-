import { GAME_HEIGHT } from "../../../constants/constants";
import { CellProps } from "../../../constants/types";
import Component from "../../Component";
import { div, ul } from "../../htmlElementsArtificial";
import { Cell } from "./Cell";
import "./styles.css";

export class Maze extends Component {
  constructor(grid: CellProps<2>[][], order: [cols: number, rows: number]) {
    super();

    this.setState({ grid, order });
  }

  override render(): HTMLElement {
    const [cols, rows] = this.state.order;

    return div(
      {
        class: "maze-wrapper",
        style: `height: ${GAME_HEIGHT + 10}px; width: ${(cols / rows) * GAME_HEIGHT + 10}px`,
      },
      ul(
        { class: "rows" },
        ...this.state.grid.map((row: CellProps<2>[], i: number) =>
          ul(
            {
              class: "row",
              id: `row_${i}`,
              style: `height: ${GAME_HEIGHT / rows}px`,
            },
            ...row.map(
              (tile, j) =>
                new Cell(
                  `row_${i}_tile${j}`,
                  tile,
                  `${(GAME_HEIGHT * cols) / rows ** 2}px`,
                ),
            ),
          ),
        ),
      ),
    );
  }
}
