import Vector from "./classes/Vector";
import { CellProps, DirBtns, DirKeys } from "./types";

const GRID_DIMENSIONS = 2;
const GAME_HEIGHT = 720;

//! Fix bug(s) in createMaze.ts for non-square mazes
const DIFFICULTIES = {
  EASY: [9, 9],
  MEDIUM: [18, 18],
  HARD: [36, 36],
  MASTER: [72, 72],
};

const MODAL_IDS = {
  SETTINGS: "settings",
  RULES: "rules",
  GAME_COMPLETE: "game_complete",
};

const FORM_IDS = {
  REGISTER: "register",
  LOGIN: "login",
  CHANGE_PASSWORD: "change_password",
};

const INIT_CELL_STATE: CellProps<typeof GRID_DIMENSIONS> = {
  gen: {
    isVisited: false,
    walls: {
      d: true,
      u: true,
      r: true,
      l: true,
    },
    pos: new Vector<2>([-1, -1]),
  },
  isPath: false,
};

const MV_DIRS: [DirKeys, Vector<2>][] = [
  ["d", new Vector<2>([0, 1])],
  ["u", new Vector<2>([0, -1])],
  ["r", new Vector<2>([1, 0])],
  ["l", new Vector<2>([-1, 0])],
];

const OPP_WALLS: Record<DirKeys, DirKeys> = {
  d: "u",
  u: "d",
  r: "l",
  l: "r",
};

const DIR_BTNS: DirBtns = {
  UP: {
    key: "u",
    svg: "",
  },
  LEFT: {
    key: "l",
    svg: "",
  },
  DOWN: {
    key: "d",
    svg: "",
  },
  RIGHT: {
    key: "r",
    svg: "",
  },
};

export {
  GAME_HEIGHT,
  DIFFICULTIES,
  INIT_CELL_STATE,
  MV_DIRS,
  OPP_WALLS,
  GRID_DIMENSIONS,
  MODAL_IDS,
  FORM_IDS,
  DIR_BTNS,
};
