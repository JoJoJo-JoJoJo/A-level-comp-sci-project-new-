import Component from "../Component";
import { button, dialog, div, p } from "../htmlElementsArtificial";
import "./styles.css";

// Dialog needs to be on DOM on first load, but can be toggled on/off with dialog.showModal() and dialog.close()

export abstract class Modal extends Component {
  constructor(id: string) {
    super();

    this.setState({ id });
  }

  override render(): HTMLElement {
    return dialog(
      {
        class: "modal",
        id: this.state.id,
        closedby: "any",
      },
      button(
        {
          class: "btn modal-close-btn",
          autofocus: true,
          commandfor: this.state.id,
          command: "close",
        },
        "Close",
      ),
      div(
        {
          class: "modal-content",
        },
        p(
          "This is my template modal for development, with content for " +
            this.state.id,
        ),
      ),
    );
  }
}
