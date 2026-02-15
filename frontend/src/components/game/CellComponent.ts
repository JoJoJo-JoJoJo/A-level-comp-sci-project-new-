import { CellProps } from "../../constants/types";
import Component from "../Component";
import { div } from "../htmlElementsArtificial";

export class CellComponent extends Component {
  #id: string;
  #styles: { width: string; height: string };

  constructor(
    id: string,
    tile: CellProps<2>,
    styles: { width: string; height: string },
  ) {
    super();
    this.#id = id;
    this.#styles = styles;

    const borders: [string, boolean][] = Object.entries(tile.gen.walls).filter(
      ([_, v]) => v === true,
    );
    this.setState({ borders });
  }

  override render(): HTMLElement {
    return div({
      id: this.#id,
      class: String.raw`cell-border ${this.state.borders
        .map((b: [string, boolean]) => "border-" + b[0])
        .join(" ")}`,
      width: this.#styles.width,
      height: this.#styles.height,
    });
  }
}
