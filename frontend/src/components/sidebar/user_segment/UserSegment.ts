import Component from "../../Component";
import { p, div } from "../../htmlElementsArtificial";
import { SidebarState } from "../Sidebar";
import "./styles.css";

export class UserSegment extends Component {
  constructor(user: SidebarState["user"]) {
    super();

    //? Sets the state for this class
    this.setState({ name: user.name, class: user.class });
  }

  //? Renders the HTML for this component
  override render(): HTMLElement {
    return div(
      {
        class: "user-segment",
        id: "userSegment",
      },
      div(
        {
          class: "user-icon",
        },
        p(this.state.name.slice(0, 1).toUpperCase()),
      ),
      div(
        {
          class: "user-info",
        },
        p(
          {
            class: "user-name",
          },
          this.state.name,
        ),
        p(
          {
            class: "user-class",
          },
          "Class " + this.state.class,
        ),
      ),
    );
  }
}
