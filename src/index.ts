import Vector from "./constants/classes/Vector";
import { DIFFICULTIES, GAME_HEIGHT } from "./constants/constants";
import gridHtml from "./grid";
import createMaze from "./utils/createMaze";

const root = document.getElementById("root")!;

const [cols, rows] = DIFFICULTIES.EASY;

root.innerHTML = `
  <div class="game" style="height: ${GAME_HEIGHT + 10}px; width: ${
  (cols / rows) * (GAME_HEIGHT + 10)
}px">
    ${gridHtml}
  </div>
`;

console.table(createMaze(10, 10, new Vector<2>([0, 0])));
