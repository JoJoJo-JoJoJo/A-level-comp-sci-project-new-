import Vector from "../../constants/classes/Vector";
import { DIFFICULTIES } from "../../constants/constants";
import createMaze from "../../utils/createMaze";
import Component from "../Component";
import { Game } from "../game/Game";
import { div } from "../htmlElementsArtificial";
import { RulesModal } from "../modal/modals/RulesModal";
import { SettingsModal } from "../modal/modals/SettingsModal";
import { Sidebar } from "../sidebar/Sidebar";

export default class Home extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    //! Performance struggles on MASTER difficulty - find way to only re-render specific cell components when player moves
    const [cols, rows] = DIFFICULTIES.MEDIUM;

    //? If type of 'startPos' is not specified, it is inferred as number[], not [number, number]
    const startPos: [number, number] = [0, 0];
    // const endPos: [number, number] = [1, 1];
    const endPos: [number, number] = [cols - 1, rows - 1];
    const maze = createMaze(cols, rows, new Vector<2>(startPos));

    const game = new Game(maze, { cols, rows }, startPos, endPos);
    function playerMoveHandler(e: KeyboardEvent) {
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
    }
    //* Will need to remove event listener for other pages eventually
    window.addEventListener("keydown", playerMoveHandler);

    //? Fetch data and assign to elements
    return div(
      {
        class: "home-page-wrapper",
        id: "homePageWrapper",
      },
      new Sidebar({
        name: "Loading...",
        group: "Loading...",
      }).render(),
      game.render(),
      new SettingsModal().render(),
      new RulesModal().render(),
    );
  }
}
