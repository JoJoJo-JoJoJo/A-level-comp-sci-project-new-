import Component from "./Component";

export default abstract class PageComponent extends Component {
  constructor() {
    super();
  }

  abstract fetchPage(): HTMLElement | Array<HTMLElement>;
}
