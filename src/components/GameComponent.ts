import { DIFFICULTIES, GAME_HEIGHT } from "../constants/constants";
import { CellProps } from "../constants/types";
import gridHtml from "../grid";
import Component from "./Component";
import { div } from "./htmlElementsArtificial";

// Dispatched events were drilled through the stateless grid component, but by emitting a custom event, every cell component can listen for it and act with the data passed through in the DTO

export class GameComponent extends Component {
  constructor(maze: CellProps<2>[][] = []) {
    super();
    // Change difficulties object to implement FixedSizeArray<2>
    const [cols, rows] = DIFFICULTIES.EASY;
    this.setState({ maze, order: [cols, rows] });
  }

  override render(): HTMLElement {
    return div(
      {
        class: "game",
        height: `${GAME_HEIGHT + 10}px`,
        width: `${(this.state.cols / this.state.rows) * (GAME_HEIGHT + 10)}px`,
      },
      gridHtml(this.state.maze, [this.state.cols, this.state.rows])
    );
  }
}
