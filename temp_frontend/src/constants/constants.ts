import Vector from "./classes/Vector";
import { CellProps, DirKeys } from "./types";

const GRID_DIMENSIONS = 2;

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

export { GRID_DIMENSIONS, INIT_CELL_STATE, MV_DIRS, OPP_WALLS };
