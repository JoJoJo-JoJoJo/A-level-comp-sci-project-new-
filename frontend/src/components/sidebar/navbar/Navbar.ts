import Vector from "../../../constants/classes/Vector";
import {
  DIFFICULTIES,
  MODAL_IDS,
  START_POS,
} from "../../../constants/constants";
import createMaze from "../../../utils/createMaze";
import Component from "../../Component";
import { Maze } from "../../game/maze/Maze";
import { nav, ul, li, p } from "../../htmlElementsArtificial";
// import { SidebarState } from "../Sidebar";
import "./styles.css";

export class Navbar extends Component {
  constructor() {
    super();
  }

  private activateModal(
    modalId: (typeof MODAL_IDS)[keyof typeof MODAL_IDS],
  ): void {
    const modal = document.getElementById(modalId);
    if (modal !== null && modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  }

  //? Renders the HTML for this component
  //* Might need to split into more components we'll see
  //* Change navbar to use anchor elements for text for better accessibility?
  override render(): HTMLElement {
    return nav(
      {
        class: "nav-wrapper",
      },
      ul(
        {
          class: "nav",
          id: "nav",
        },
        li(
          {
            class: "dropdown",
            onclick: (e: MouseEvent) => {
              e.preventDefault();
              //? Get the child menu element and check if it has the "show" class
              const menu = document.getElementById(
                "dropdownMenu",
              ) as HTMLElement;
              const isMenuShown = menu.classList.contains("show");

              //? If, on click, the menu is not shown then show it and vice versa
              if (!isMenuShown) {
                menu.classList.add("show");
              } else {
                menu.classList.remove("show");
              }
            },
          },
          p("Select Difficulty"),
          ul(
            {
              class: "dropdown-menu",
              id: "dropdownMenu",
            },
            //* Might need to pass value of grid size for each difficulty in for events later on
            ...Object.keys(DIFFICULTIES).map((difficulty) =>
              // Eventually there should be an actual SVG icon here
              li(
                {
                  onclick: (e: MouseEvent) => {
                    e.preventDefault();
                    //* Cause new maze generation here based on difficulty
                    const [cols, rows] =
                      DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES];

                    const newMaze = new Maze(
                      createMaze(cols, rows, new Vector<2>(START_POS)),
                      [cols, rows],
                    );

                    const mazeContainer =
                      document.getElementById("mazeContainer")!;

                    mazeContainer.replaceWith(newMaze.render());
                  },
                },
                "<svg-icon-here>",
                p(difficulty),
              ),
            ),
          ),
        ),
        li(
          {
            onclick: (e: MouseEvent) => {
              e.preventDefault();
              this.activateModal(MODAL_IDS.SETTINGS);
            },
          },
          "<svg-icon-here>",
          p("Settings"),
        ),
        li(
          {
            onclick: (e: MouseEvent) => {
              e.preventDefault();
              this.activateModal(MODAL_IDS.RULES);
            },
          },
          "<svg-icon-here>",
          p("Rules"),
        ),
      ),
    );
  }
}
