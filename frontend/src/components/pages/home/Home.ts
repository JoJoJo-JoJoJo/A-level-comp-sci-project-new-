import Vector from "../../../constants/classes/Vector";
import { DIFFICULTIES, START_POS } from "../../../constants/constants";
import { CellProps } from "../../../constants/types";
import createMaze from "../../../utils/createMaze";
import Component from "../../Component";
import { Game } from "./game/Game";
// import Btn from "../../generic/Btn";
import { div } from "../../htmlElementsArtificial";
import { RulesModal } from "../../modal/modals/RulesModal";
import { SettingsModal } from "../../modal/modals/SettingsModal";
import { Sidebar } from "./sidebar/Sidebar";
import "./styles.css";

export default class Home extends Component {
  private game: Game | null = null;
  private playerMoveHandler: ((e: KeyboardEvent) => void) | null = null;

  constructor() {
    super();

    //* Add game difficulty as state here - by default is easy mode
    this.setState({
      difficulty: DIFFICULTIES.EASY,
    });
  }

  private attachKeyboardHandler(game: Game): void {
    //? Only attach once, remove old handler first
    if (this.playerMoveHandler) {
      window.removeEventListener("keydown", this.playerMoveHandler);
    }

    this.playerMoveHandler = (e: KeyboardEvent) => {
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
    };

    window.addEventListener("keydown", this.playerMoveHandler);
  }

  override render(): HTMLElement {
    const [cols, rows] = this.state.difficulty;

    const endPos: [number, number] = [cols - 1, rows - 1];
    const maze = createMaze(cols, rows, new Vector<2>(START_POS));

    this.game = new Game(maze, { cols, rows }, START_POS, endPos);
    this.attachKeyboardHandler(this.game);
    console.log(this.game);

    const generateNewMaze = (
      newMaze: CellProps<2>[][],
      order: {
        cols: number;
        rows: number;
      },
    ) => {
      this.game?.generateNewMaze(newMaze, order);
      console.log(this.game);
    };

    //? Fetch data and assign to elements
    return div(
      {
        class: "home-page-wrapper",
        id: "homePageWrapper",
      },
      new Sidebar({
        user: {
          name: "Loading...",
          group: "Loading...",
        },
        generateNewMaze,
      }).render(),
      this.game.render(),
      new SettingsModal().render(),
      new RulesModal().render(),
      // new Btn("", "Play", (e: Event) => {
      //   e.preventDefault();

      //   AUDIO.play();
      // }).render(),
    );
  }
}
