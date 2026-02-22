import Component from "../Component";
import { aside } from "../htmlElementsArtificial";
import { UserSegment } from "./user_segment/UserSegment";
import { Navbar } from "./navbar/Navbar";
import "./styles.css";

//* Could move type to 'UserSegment' component if not needed for state on 'Navbar' component
//? Defines the state to be used throughout the sidebar
export type SidebarState = {
  user: {
    name: string;
    class: string;
  };
};

export class Sidebar extends Component {
  constructor(userData: SidebarState["user"]) {
    super();

    //? Sets the state for this class
    this.setState({
      user: userData,
    });
  }

  //? Renders the HTML for this component
  override render(): HTMLElement {
    return aside(
      {
        class: "sidebar",
      },
      new UserSegment(this.state.user),
      new Navbar(),
    );
  }
}
