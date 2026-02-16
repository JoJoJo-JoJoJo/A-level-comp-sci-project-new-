import { GAME_HEIGHT } from "../../constants/constants";
import { CellProps } from "../../constants/types";
import Component from "../Component";
import Grid from "./Grid";
import { div } from "../htmlElementsArtificial";

// Dispatched events were drilled through the stateless grid component, but by emitting a custom event, every cell component can listen for it and act with the data passed through in the event object

export class GameComponent extends Component {
  constructor(
    maze: CellProps<2>[][] = [],
    order: { cols: number; rows: number },
  ) {
    super();
    // Change difficulties object to implement FixedSizeArray<2>
    this.setState({ maze, order });
  }

  override render(): HTMLElement {
    return div(
      {
        class: "game",
        height: `${GAME_HEIGHT + 10}px`,
        width: `${
          (this.state.order.cols / this.state.order.rows) * (GAME_HEIGHT + 10)
        }px`,
      },
      Grid(this.state.maze, [this.state.cols, this.state.rows]),
    );
  }
}
