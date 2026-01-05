import Vector from "./classes/Vector";
import { CellProps, DirKeys } from "./types";

const gridDimensions = 2;

const initCellState: CellProps<typeof gridDimensions> = {
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

const mvDirs: [DirKeys, Vector<2>][] = [
  ["d", new Vector<2>([0, 1])],
  ["u", new Vector<2>([0, -1])],
  ["r", new Vector<2>([1, 0])],
  ["l", new Vector<2>([-1, 0])],
];

const oppWalls: Record<DirKeys, DirKeys> = {
  d: "u",
  u: "d",
  r: "l",
  l: "r",
};

export { initCellState, mvDirs, oppWalls, gridDimensions };
