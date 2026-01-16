import { GameComponent } from "./components/GameComponent";
import Vector from "./constants/classes/Vector";
import createMaze from "./utils/createMaze";

const root = document.getElementById("root")!;

const game = new GameComponent();

root.appendChild(game.render());

console.table(createMaze(9, 9, new Vector<2>([0, 0])));
