import Vector from "../../../../../constants/classes/Vector";
import {
  DIFFICULTIES,
  MODAL_IDS,
  START_POS,
} from "../../../../../constants/constants";
import { CellProps } from "../../../../../constants/types";
import createMaze from "../../../../../utils/createMaze";
import Component from "../../../../Component";
import { nav, ul, li, p, i } from "../../../../htmlElementsArtificial";
import "./styles.css";
// import settingsIcon from "../../../assets/settings.svg";

export class Navbar extends Component {
  constructor(
    generateNewMaze: (
      newMaze: CellProps<2>[][],
      order: {
        cols: number;
        rows: number;
      },
    ) => void,
  ) {
    super();

    this.setState({
      generateNewMaze,
    });
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

              //? Toggle rotate on dropdown arrow
              const arrow = document.getElementById("dropdownArrow")!;
              arrow.classList.toggle("rotated");

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
          i(
            {
              class: "dropdown-arrow",
              id: "dropdownArrow",
            },
            "▼",
          ),
          p("Select Difficulty"),
          ul(
            {
              class: "dropdown-menu",
              id: "dropdownMenu",
            },
            ...Object.keys(DIFFICULTIES).map((difficulty) =>
              // Eventually there should be an actual SVG icon here
              li(
                {
                  onclick: (e: MouseEvent) => {
                    e.preventDefault();

                    //? Extract order of maze from chosen difficulty
                    const [cols, rows] =
                      DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES];

                    this.state.generateNewMaze(
                      createMaze(cols, rows, new Vector<2>(START_POS)),
                      {
                        cols,
                        rows,
                      },
                    );
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
          // settingsIcon,
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
