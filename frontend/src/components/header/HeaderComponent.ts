import Component from "../Component";
import { h1, header } from "../htmlElementsArtificial";
import "./styles.css";

export class HeaderComponent extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    return header({ class: "header" }, h1({ class: "title" }, "NEA Project"));
  }
}
