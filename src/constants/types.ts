//* UTILITY TYPES

import Vector from "./classes/Vector";

// S --> Size of vector
// Helper type to recursively build the tuple/vector
// Basically checks if Accumulated tuple (Acc) has length S yet - if true, returns tuple, if false, returns tuple with size one greater
type _FixedSizeVector<
  S extends number,
  Acc extends number[] = []
> = Acc["length"] extends S ? Acc : _FixedSizeVector<S, [...Acc, number]>;

type FixedSizeVector<S extends number> = S extends S
  ? number extends S
    ? number[]
    : _FixedSizeVector<S>
  : never;

//* CLASS TYPE DEFINITIONS

type VectorProps<L extends number> = {
  data: FixedSizeVector<number>;
  length: number;
  add(vectors: Vector<L>[]): Vector<L>;
  subtract(vectors: Vector<L>[]): Vector<L>;
};

//* DATA TYPES

// I'm using types for the dir keys because I might choose to make mazes with < 4 || > 4 dirs in the future
type DirKeys = "d" | "u" | "r" | "l";

type CellProps<S extends number> = {
  gen: {
    isVisited: boolean;
    walls: {
      d: boolean;
      u: boolean;
      r: boolean;
      l: boolean;
    };
    pos: Vector<S>;
  };
};

export type { CellProps, FixedSizeVector, VectorProps, DirKeys };
