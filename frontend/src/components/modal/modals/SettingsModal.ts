import { AUDIO, MODAL_IDS } from "../../../constants/constants";
import { navigate } from "../../../router";
import Component from "../../Component";
import { NavBtn } from "../../generic/Btn";
import {
  button,
  dialog,
  div,
  h2,
  input,
  label,
  span,
} from "../../htmlElementsArtificial";
import { Modal } from "../Modal";
import "./settings.css";

class Settings extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    return div(
      {
        class: "settings-container",
        id: "settingsContainer",
      },
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
          oninput: (e: Event) => {
            const volDisplay = document.getElementById("bgVolDisplay")!;

            //? Change audio player volume
            const audioLevel = Number((e.target as HTMLInputElement).value);

            AUDIO.volume = audioLevel / 100;
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
      new NavBtn(
        "change-pw-btn",
        "/forms/change_password",
        "Change Password",
        (e: Event) => navigate(e, "/forms/change_password"),
      ).render(),
    );
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
        h2(
          {
            class: "settings-title",
          },
          "Settings",
        ),
        new Settings().render(),
      ),
    );
  }
}
