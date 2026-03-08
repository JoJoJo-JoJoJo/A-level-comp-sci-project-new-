import DLinkedList from "../../constants/classes/DLinkedList";
import Vector from "../../constants/classes/Vector";
import {
  DIR_BTNS,
  MODAL_IDS,
  MV_DIRS,
  START_POS,
} from "../../constants/constants";
import { CellProps, DirKeys } from "../../constants/types";
import createMaze from "../../utils/createMaze";
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

    //? Initialize maze
    const mazeComponent = new Maze(
      maze,
      Object.values(order) as [number, number],
    );

    //? Sets the state for the component
    //* May be worth adding type param for state
    this.setState({
      mazeComponent,
      order,
      DLL,
      startPos,
      endPos,
      times: {
        start: null,
        end: null,
        hasPlayerMoved: false,
      },
    });
  }

  //? Helper method to render new maze
  generateNewMaze(
    maze: CellProps<2>[][],
    order: {
      cols: number;
      rows: number;
    },
  ): void {
    //* This is correct
    console.log(maze);

    if (typeof maze === "undefined")
      return console.error("New maze should not be undefined");

    //? Update the existing maze component's state instead of creating a new instance to avoid isolating maze instances on the DOM
    this.state.mazeComponent.state.grid = maze;
    this.state.mazeComponent.state.order = Object.values(order) as [
      number,
      number,
    ];

    const newDLL = new DLinkedList<[number, number]>();
    newDLL.insert(this.state.startPos);

    this.setState({
      ...this.state,
      order: order,
      DLL: newDLL,
      endPos: [order.cols - 1, order.rows - 1],
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
    const pageWrapper = document.getElementById("homePageWrapper")!;
    const gameCompleteModal = new GameCompleteModal();
    gameCompleteModal.setPlayerTimeState(time);

    //* Attach event listener to "play again" btn on game complete modal that updates maze

    pageWrapper.appendChild(gameCompleteModal.render());

    const playAgainBtn = document.getElementById(
      "modalPlayAgainBtn",
    )! as HTMLButtonElement;
    playAgainBtn.addEventListener("click", (e: MouseEvent): void => {
      //? Prevent potential default refresh behavior + event propagation on DOM
      e.preventDefault();
      e.stopPropagation();
      console.log(e);

      //? Hide game complete modal on UI + remove from DOM
      // const root = document.getElementById("root")!;
      const gcModal = document.getElementById(MODAL_IDS.GAME_COMPLETE);
      if (!(gcModal instanceof HTMLDialogElement)) return;
      gcModal.close();
      gcModal.parentNode!.removeChild(gcModal);

      //* Regenerate maze of same difficulty
      this.generateNewMaze(
        createMaze(
          this.state.order.cols,
          this.state.order.rows,
          new Vector<2>(START_POS),
        ),
        this.state.order,
      );
    });

    //? Show modal on DOM
    const gcModal = document.getElementById(MODAL_IDS.GAME_COMPLETE);
    if (!(gcModal instanceof HTMLDialogElement)) return;
    gcModal.showModal();
  }

  handlePlayerMove(dir: DirKeys): void {
    console.log("Player moving");
    //? If first player move, get start time
    if (!this.state.times.hasPlayerMoved) {
      const startTime = new Date();
      console.log("Start time: " + startTime.valueOf().toString());
      this.state.times = {
        ...this.state.times,
        start: startTime,
        hasPlayerMoved: true,
      };
    }

    //? Get head node cell pos in form [x, y]
    const [x, y] = this.state.DLL.head.value;

    //? If player can't move, do nothing
    const headNodeCellState = this.state.mazeComponent.state.grid[y][x];

    if (headNodeCellState.gen.walls[dir]) return;

    //? If player can move in direction, then calc new player pos
    const mvVector = MV_DIRS.filter(([k, _]) => k === dir);
    if (mvVector.length !== 1) return;

    const newPos = Vector.add(new Vector<2>([x, y]), mvVector[0][1]);

    //? Once added as a node, add respective styles to cell so player move is shown on UI
    const [newX, newY] = newPos.data;
    console.log(`Player at: ${newX}, ${newY}`);

    const [prevX, prevY] = this.state.DLL.head.next?.value ?? [-1, -1];

    //? If moving backwards, remove head node from DLL, else add new node to DLL
    if (newX === prevX && newY === prevY) {
      this.state.mazeComponent.state.grid[y][x].isPath = false;
      this.state.mazeComponent.state.cellInstances[y][x].state.isPath = false;

      this.state.DLL.delete(this.state.DLL.head);
    } else {
      this.state.mazeComponent.state.grid[newY][newX].isPath = true;
      this.state.mazeComponent.state.cellInstances[newY][newX].state.isPath =
        true;

      this.state.DLL.insert(newPos.data);

      //? If player reached goal cell, get end time + display modal
      if (this.state.endPos[0] === newX && this.state.endPos[1] === newY) {
        const endTime = new Date();
        console.log("End time: " + endTime.valueOf().toString());
        this.state.times = {
          ...this.state.times,
          end: endTime,
        };

        this.showGameCompleteModal();
      }
    }

    // this.state.maze = this.state.maze;
  }

  //? Renders the HTML for the component
  override render(): HTMLElement {
    return div(
      {
        class: "game",
      },
      h1({ class: "title" }, "AMAZE"),
      this.state.mazeComponent.render(),
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
