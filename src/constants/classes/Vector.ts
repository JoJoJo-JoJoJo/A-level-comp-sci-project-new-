import { FixedSizeVector, VectorProps } from "../types";

// typeof L should equal #length
class Vector<L extends number> implements VectorProps<L> {
  #data: FixedSizeVector<L>;
  #size: number;

  constructor(tuple: FixedSizeVector<L>) {
    this.#data = tuple;
    this.#size = tuple.length;
  }

  static add<L extends number>(...vectors: Vector<L>[]): Vector<L> | null {
    if (vectors.length === 0) {
      return null;
    }

    return vectors.reduce((vAcc: Vector<L>, vCur: Vector<L>): Vector<L> => {
      for (let i = 0; i < vectors[0].size; i++) {
        vAcc.data[i] += vCur.data[i];
      }
      return vAcc;
    }, new Vector<L>(Array(vectors[0].size).fill(0) as FixedSizeVector<L>));
  }

  static subtract(
    vInit: Vector<number>,
    ...vectors: Vector<number>[]
  ): Vector<number> | null {
    if (vectors.length === 0 && !vInit) {
      return null;
    }
    const vSub = Vector.add(...vectors);
    if (vSub === null) return vInit;

    for (let i = 0; i < vInit.size; i++) {
      vInit.data[i] -= vSub.data[i];
    }
    return vInit;
  }

  get data() {
    return this.#data;
  }

  get size() {
    return this.#size;
  }
}

export default Vector;
