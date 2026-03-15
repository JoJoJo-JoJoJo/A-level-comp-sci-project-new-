import { CellProps } from "../../../../../constants/types";
import Component from "../../../../Component";
import { div } from "../../../../htmlElementsArtificial";
import "./styles.css";

export class Cell extends Component {
  constructor(
    id: string,
    tile: CellProps<2>,
    width: string,
    borderWidth: 1 | 2,
  ) {
    super();

    const borders: [string, boolean][] = Object.entries(tile.gen.walls).filter(
      ([_, v]) => v === true,
    );
    this.setState({
      id,
      borders,
      width,
      borderWidth,
      isPath: tile.isPath,
      isHead: tile.isHead,
    });
  }

  override render(): HTMLElement {
    return div({
      id: this.state.id,
      class: String.raw`cell cell-border ${this.state.isPath ? "visited" : ""} ${this.state.isHead ? "current" : ""} ${this.state.borders
        .map((b: [string, boolean]) => "border-" + b[0])
        .join(" ")}`,
      style: `width: ${this.state.width}; border-width: ${this.state.borderWidth}px`,
    });
  }
}
