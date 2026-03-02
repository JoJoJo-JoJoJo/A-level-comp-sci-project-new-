import Component from "../Component";
import { a, button, p } from "../htmlElementsArtificial";

export default class Btn extends Component {
  constructor(classes: string, text: string, onclick: (e: Event) => void) {
    super();

    this.setState({
      classes,
      text,
      onclick,
    });
  }

  override render(): HTMLElement {
    return button(
      {
        class: "btn " + this.state.classes,
        onclick: this.state.onclick,
      },
      p(
        {
          class: "btn-text",
        },
        this.state.text,
      ),
    );
  }
}

export class NavBtn extends Btn {
  constructor(
    classes: string,
    href: string,
    text: string,
    onclick: (e: Event) => void,
  ) {
    super(classes, text, onclick);

    this.setState({
      classes,
      href,
      text,
      onclick,
    });
  }

  override render(): HTMLElement {
    return a(
      {
        class: "btn-link",
        onclick: this.state.onclick,
        href: this.state.href,
      },
      button(
        {
          class: "btn " + this.state.classes,
        },
        p(
          {
            class: "btn-text",
          },
          this.state.text,
        ),
      ),
    );
  }
}
