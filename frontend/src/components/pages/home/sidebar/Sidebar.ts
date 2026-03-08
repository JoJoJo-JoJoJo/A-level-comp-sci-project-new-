import Component from "../../../Component";
import { aside } from "../../../htmlElementsArtificial";
import { UserSegment } from "./user_segment/UserSegment";
import { Navbar } from "./navbar/Navbar";
import "./styles.css";
import { CellProps } from "../../../../constants/types";

//* Could move type to 'UserSegment' component if not needed for state on 'Navbar' component
//? Defines the state to be used throughout the sidebar
export type SidebarState = {
  user: {
    name: string;
    group: string;
  };
  generateNewMaze: (
    newMaze: CellProps<2>[][],
    order: {
      cols: number;
      rows: number;
    },
  ) => void;
};

export class Sidebar extends Component {
  constructor(userData: SidebarState) {
    super();

    //? Sets the state for this class
    this.setState({
      user: userData.user,
      generateNewMaze: userData.generateNewMaze,
    });
  }

  //? Renders the HTML for this component
  override render(): HTMLElement {
    return aside(
      {
        class: "sidebar",
      },
      new UserSegment(this.state.user),
      new Navbar(this.state.generateNewMaze),
    );
  }
}
