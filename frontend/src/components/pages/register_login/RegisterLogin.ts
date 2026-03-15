import { navigate } from "../../../router";
import Component from "../../Component";
import { NavBtn } from "../../generic/Btn";
import { div } from "../../htmlElementsArtificial";
import "./styles.css";

export default class RegisterLogin extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    return div(
      {
        class: "index-page-wrapper",
        id: "indexPageWrapper",
      },
      div(
        {
          class: "index-btn-container",
        },
        new NavBtn("index-btn", "/forms/register", "Register", (e: Event) =>
          navigate(e, "/forms/register"),
        ).render(),
        new NavBtn("index-btn", "/forms/login", "Login", (e: Event) =>
          navigate(e, "/forms/login"),
        ).render(),
      ),
    );
  }
}
