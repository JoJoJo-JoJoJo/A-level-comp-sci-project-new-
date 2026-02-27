import { Game } from "./components/game/Game";
import Vector from "./constants/classes/Vector";
import { DIFFICULTIES } from "./constants/constants";
import createMaze from "./utils/createMaze";
import "./styles/global.css";
import { Sidebar } from "./components/sidebar/Sidebar";
import { div } from "./components/htmlElementsArtificial";
import { SettingsModal } from "./components/modal/modals/SettingsModal";
import { RulesModal } from "./components/modal/modals/RulesModal";

const root = document.getElementById("root")!;

async function fetchPage() {
  try {
    const response = await fetch("http://localhost:3000");

    if (!response.status) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    root.innerHTML = data.msg;
  } catch (err) {
    console.error(err);
  }
}

const sidebar = new Sidebar({
  name: "John Doe",
  class: "10A",
});

//! Performance struggles on MASTER difficulty - find way to only re-render specific cell components when player moves
const [cols, rows] = DIFFICULTIES.MEDIUM;

//? If type of 'startPos' is not specified, it is inferred as number[], not [number, number]
const startPos: [number, number] = [0, 0];
// const endPos: [number, number] = [1, 1];
const endPos: [number, number] = [cols - 1, rows - 1];
const maze = createMaze(cols, rows, new Vector<2>(startPos));

const game = new Game(maze, { cols, rows }, startPos, endPos);
window.addEventListener("keydown", (e: KeyboardEvent) => {
  e.stopPropagation();

  switch (e.key) {
    case "w":
    case "ArrowUp":
      game.handlePlayerMove("u");
      break;
    case "a":
    case "ArrowLeft":
      game.handlePlayerMove("l");
      break;
    case "s":
    case "ArrowDown":
      game.handlePlayerMove("d");
      break;
    case "d":
    case "ArrowRight":
      game.handlePlayerMove("r");
      break;
  }
});

const settingsModal = new SettingsModal();
const rulesModal = new RulesModal();

const wrapper = div(
  {
    class: "temp-page-wrapper",
    id: "tempPageWrapper",
  },
  sidebar.render(),
  game.render(),
  settingsModal.render(),
  rulesModal.render(),
);

root.replaceChildren(wrapper);
