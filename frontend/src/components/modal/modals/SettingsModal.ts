import { MODAL_IDS } from "../../../constants/constants";
import { navigate } from "../../../router";
import Component from "../../Component";
import { NavBtn } from "../../generic/Btn";
import {
  button,
  dialog,
  div,
  input,
  label,
  span,
} from "../../htmlElementsArtificial";
import { Modal } from "../Modal";

class Settings extends Component {
  constructor() {
    super();
  }

  override render(): Array<HTMLElement> {
    return [
      div(
        {
          class: "bg-vol-field",
          id: "bgVolSettings",
        },
        label(
          {
            for: "bgVolumeSlider",
            class: "bg-vol-label",
          },
          "Background volume:",
        ),
        input({
          class: "volume-slider bg-volume-slider",
          id: "bgVolumeSlider",
          type: "range",
          min: "0",
          max: "100",
          value: "50",
          oninput: (e: InputEvent) => {
            const bgAudioPlayer = document.getElementById(
              "bgAudio",
            )! as HTMLAudioElement;
            const volDisplay = document.getElementById("bgVolDisplay")!;

            //? Change audio player volume
            const audioLevel = Number((e.target as HTMLInputElement).value);

            bgAudioPlayer.volume = audioLevel / 50;
            volDisplay.textContent = `${audioLevel}%`;
          },
        }),
        span(
          {
            class: "bg-vol-display",
            id: "bgVolDisplay",
          },
          "50%",
        ),
      ),
      new NavBtn("", "/forms/change_password", "Change Password", (e: Event) =>
        navigate(e, "/forms/change_password"),
      ).render(),
    ];
  }
}

export class SettingsModal extends Modal {
  constructor() {
    super(MODAL_IDS.SETTINGS);
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
        ...new Settings().render(),
      ),
    );
  }
}
