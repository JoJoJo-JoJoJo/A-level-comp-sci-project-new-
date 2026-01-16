import { GameComponent } from "./components/game/GameComponent";
import Vector from "./constants/classes/Vector";
import { DIFFICULTIES } from "./constants/constants";
import createMaze from "./utils/createMaze";

const root = document.getElementById("root")!;

const [cols, rows] = DIFFICULTIES.EASY;
const maze = createMaze(cols, rows, new Vector<2>([0, 0]));
console.table(maze);
const game = new GameComponent(maze, [cols, rows]);

root.appendChild(game.render());
