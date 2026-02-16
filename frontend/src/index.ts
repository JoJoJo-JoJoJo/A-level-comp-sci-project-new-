import { GameComponent } from "./components/game/GameComponent";
import Vector from "./constants/classes/Vector";
import { DIFFICULTIES } from "./constants/constants";
import createMaze from "./utils/createMaze";
import "./styles/global.css";
import { HeaderComponent } from "./components/header/HeaderComponent";

const root = document.getElementById("root")!;

// fetch("http://localhost:3000")
//   .then((res) => {
//     if (!res.status) {
//       throw new Error(`Server error: ${res.status} ${res.statusText}`);
//     }
//     return res.json();
//   })
//   .then((data) => {
//     root.innerText = data.msg;
//   })
//   .catch((err) => console.error(err));

const header = new HeaderComponent();

const [cols, rows] = DIFFICULTIES.EASY;
const maze = createMaze(cols, rows, new Vector<2>([0, 0]));
console.table(maze);
const game = new GameComponent(maze, { cols, rows });

root.appendChild(header.render());
root.appendChild(game.render());
