// import { DIFFICULTIES } from "./constants/constants";

import { ul } from "../htmlElementsArtificial";
import { GAME_HEIGHT } from "../../constants/constants";
import { CellProps } from "../../constants/types";
import { CellComponent } from "./CellComponent";

//! Still need to implement "cellHtml"
//* This is an entirely stateless component!!! (very nice I know)
function Grid(grid: CellProps<2>[][], [cols, rows]: [number, number]) {
  return ul(
    { class: "rows" },
    ...grid.map((row, i) =>
      ul(
        {
          class: "row",
          id: `row_${i}`,
          width: "100%",
          height: `${GAME_HEIGHT / rows}px`,
        },
        ...row.map(
          (tile, j) =>
            new CellComponent(`row_${i}_tile${j}`, tile, {
              width: `${(GAME_HEIGHT * cols) / rows ** 2}px`,
              height: "100%",
            })
        )
      )
    )
  );
}

export default Grid;
