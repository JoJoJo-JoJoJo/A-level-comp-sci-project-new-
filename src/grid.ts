// import { DIFFICULTIES } from "./constants/constants";

import { ul } from "./components/htmlElementsArtificial";
import { GAME_HEIGHT } from "./constants/constants";
import { CellProps } from "./constants/types";

// const [cols, rows] = DIFFICULTIES.EASY;

//! Still need to implement "cellHtml"
//* This is an entirely stateless component!!! (very nice I know)
function gridHtml(grid: CellProps<2>[][], [cols, rows]: [number, number]) {
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
        ...row.map((tile, j) => cellHtml({ id: `row_${i}_tile${j}` }))
      )
    )
  );
}

export default gridHtml;
