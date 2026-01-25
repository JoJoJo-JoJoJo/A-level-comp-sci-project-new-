import { GameComponent } from "./components/game/GameComponent";
import Vector from "./constants/classes/Vector";
import { DIFFICULTIES } from "./constants/constants";
import createMaze from "./utils/createMaze";
import "./styles/global.css";
import { HeaderComponent } from "./components/header/HeaderComponent";

const root = document.getElementById("root")!;
const header = new HeaderComponent();

const [cols, rows] = DIFFICULTIES.EASY;
const maze = createMaze(cols, rows, new Vector<2>([0, 0]));
console.table(maze);
const game = new GameComponent(maze, { cols, rows });

root.appendChild(header.render());
root.appendChild(game.render());
