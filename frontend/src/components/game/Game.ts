import DLinkedList from "../../constants/classes/DLinkedList";
import Vector from "../../constants/classes/Vector";
import { DIR_BTNS, MODAL_IDS, MV_DIRS } from "../../constants/constants";
import { CellProps, DirKeys } from "../../constants/types";
import Component from "../Component";
import { button, div, h1, p } from "../htmlElementsArtificial";
import { GameCompleteModal } from "../modal/modals/GameCompleteModal";
import { Maze } from "./maze/Maze";
import "./styles.css";

export class Game extends Component {
  constructor(
    maze: CellProps<2>[][] = [],
    order: { cols: number; rows: number },
    startPos: [number, number],
    endPos: [number, number],
  ) {
    super();

    //? Initialize doubly-linked list
    const DLL = new DLinkedList<[number, number]>();
    DLL.insert(startPos);
    console.log(DLL);

    //? Sets the state for the component
    //* May be worth adding type param for state
    this.setState({
      maze,
      order,
      DLL,
      endPos,
      times: {
        start: null,
        end: null,
        hasPlayerMoved: false,
      },
    });
  }

  //? Helper method to calculate time in MM:SS format
  private calculateTime(): string {
    //? Calculate time difference in seconds
    const { start, end } = this.state.times;
    const difference = (end.valueOf() - start.valueOf()) / 1000;

    //? Calculate minutes and remaining seconds for player time
    const minutes = Math.floor(difference / 60);
    const seconds = Math.floor(difference % 60);

    //? Return in correct format
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  private showGameCompleteModal(): void {
    //? Get player time in MM:SS format
    const time = this.calculateTime();

    //? Add modal to DOM with player time
    const pageWrapper = document.getElementById("tempPageWrapper")!;
    const gameCompleteModal = new GameCompleteModal();
    gameCompleteModal.setPlayerTimeState(time);
    pageWrapper.appendChild(gameCompleteModal.render());

    //? Show modal on DOM
    const gcModal = document.getElementById(MODAL_IDS.GAME_COMPLETE);
    if (!(gcModal instanceof HTMLDialogElement)) return;
    gcModal.showModal();
  }

  handlePlayerMove(dir: DirKeys): void {
    //? If first player move, get start time
    if (!this.state.hasPlayerMoved) {
      this.state.hasPlayerMoved = true;
      const startTime = new Date();
      console.log("Start time: " + startTime.valueOf().toString());
      this.state.times.start = startTime;
    }

    //? Get head node cell pos in form [x, y]
    const [x, y] = this.state.DLL.head.value;

    //? If player can't move, do nothing
    const headNodeCellState = this.state.maze[y][x];

    if (headNodeCellState.gen.walls[dir]) return;

    //? If player can move in direction, then calc new player pos
    const mvVector = MV_DIRS.filter(([k, _]) => k === dir);
    if (mvVector.length !== 1) return;

    const newPos = Vector.add(new Vector<2>([x, y]), mvVector[0][1]);

    //? Once added as a node, add respective styles to cell so player move is shown on UI
    const [newX, newY] = newPos.data;

    const [prevX, prevY] = this.state.DLL.head.next?.value ?? [-1, -1];

    //? If moving backwards, remove head node from DLL, else add new node to DLL
    if (newX === prevX && newY === prevY) {
      this.state.maze[y][x].isPath = false;

      this.state.DLL.delete(this.state.DLL.head);
    } else {
      this.state.maze[newY][newX].isPath = true;

      this.state.DLL.insert(newPos.data);

      //? If player reached goal cell, get end time + display modal
      if (this.state.endPos[0] === newX && this.state.endPos[1] === newY) {
        const endTime = new Date();
        console.log("End time: " + endTime.valueOf().toString());
        this.state.times.end = endTime;

        this.showGameCompleteModal();
      }
    }

    this.state.maze = this.state.maze;
  }

  //? Renders the HTML for the component
  override render(): HTMLElement {
    return div(
      {
        class: "game",
      },
      h1({ class: "title" }, "AMAZE"),
      new Maze(this.state.maze, [
        this.state.order.cols,
        this.state.order.rows,
      ]).render(),
      div(
        {
          class: "dir-btns",
        },
        ...Object.values(DIR_BTNS).map(({ key, svg }) =>
          button(
            {
              class: "dir-btn",
              id: `dir-${key}`,
              onclick: (e: MouseEvent) => {
                //! NEEDS WRITING PROPERLY
                e.stopPropagation();
                this.handlePlayerMove(key);
              },
            },
            p(svg === "" ? key : svg),
          ),
        ),
      ),
    );
  }
}
