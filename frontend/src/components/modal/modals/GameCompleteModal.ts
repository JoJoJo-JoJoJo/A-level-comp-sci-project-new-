import { MODAL_IDS } from "../../../constants/constants";
import { button, dialog, div, h2, time } from "../../htmlElementsArtificial";
import { Modal } from "../Modal";
import "../styles.css";
import "./styles.css";

export class GameCompleteModal extends Modal {
  constructor() {
    super(MODAL_IDS.GAME_COMPLETE);

    this.setState({ id: this.state.id, time: "00:00" });
  }

  //? Update state with player time
  setPlayerTimeState(time: string) {
    this.state.time = time;
  }

  override render(): HTMLElement {
    console.log("Rendered!");
    return dialog(
      {
        class: "modal",
        id: this.state.id,
        closedby: "any",
      },
      div(
        {
          class: "modal-wrapper",
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
          h2(
            {
              class: "modal-game-complete-msg",
            },
            "GAME COMPLETE!!!",
          ),
          time(
            {
              class: "modal-player-time",
              datetime: this.state.time,
            },
            this.state.time,
          ),
          button(
            {
              class: "btn modal-play-again",
              id: "modalPlayAgainBtn",
            },
            "Play again",
          ),
        ),
      ),
    );
  }
}
