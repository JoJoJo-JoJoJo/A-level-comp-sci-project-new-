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
              onclick: (e: MouseEvent): void => {
                //? Prevent potential default refresh behavior + event propagation on DOM
                e.preventDefault();
                e.stopPropagation();
                console.log(e);

                //* Regenerate maze of same difficulty

                //? Hide game complete modal on UI + remove from DOM
                // const root = document.getElementById("root")!;
                const gcModal = document.getElementById(
                  MODAL_IDS.GAME_COMPLETE,
                );
                if (!(gcModal instanceof HTMLDialogElement)) return;
                gcModal.close();
                gcModal.parentNode!.removeChild(gcModal);
              },
            },
            "Play again",
          ),
        ),
      ),
    );
  }
}
