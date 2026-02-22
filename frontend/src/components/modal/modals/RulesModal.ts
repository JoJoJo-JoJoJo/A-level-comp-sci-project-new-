import { MODAL_IDS } from "../../../constants/constants";
import { Modal } from "../Modal";

export class RulesModal extends Modal {
  constructor() {
    super(MODAL_IDS.RULES);
  }
}

/**
 * override render(): HTMLElement {
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
 */
