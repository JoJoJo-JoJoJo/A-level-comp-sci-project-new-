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

console.table(createMaze(9, 9, new Vector<2>([0, 0])));

//* UNIT TESTS - Vector
const v1 = new Vector<2>([1, 2]);
const v2 = new Vector<2>([3, 4]);
console.log(v1.data);
console.log(v2.data);
