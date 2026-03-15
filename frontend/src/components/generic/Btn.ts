import Component from "../Component";
import { a, button, input, p } from "../htmlElementsArtificial";
import "./styles.css";

export default class Btn extends Component {
  constructor(classes: string, text: string, onclick?: (e: Event) => void) {
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
        onclick:
          typeof this.state.onclick === "undefined"
            ? () => {}
            : this.state.onclick,
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
    return button(
      {
        class: "btn " + this.state.classes,
        onclick: this.state.onclick,
      },
      a(
        {
          class: "btn-text",
          href: this.state.href,
        },
        this.state.text,
      ),
    );
  }
}

export class SubmitBtn extends Btn {
  constructor(classes: string, text: string, id: string) {
    super(classes, text);

    this.setState({
      ...this.state,
      id,
    });
  }

  override render(): HTMLElement {
    return input({
      type: "submit",
      id: this.state.id,
      class: "btn " + this.state.classes,
      name: "form_submit_button",
      value: this.state.text,
    });
  }
}
