import { FixedSizeVector, VectorProps } from "../types";

// typeof L should equal #length
class Vector<L extends number> implements VectorProps<L> {
  #data: FixedSizeVector<L>;
  #size: number;

  constructor(tuple: FixedSizeVector<L>) {
    this.#data = tuple;
    this.#size = tuple.length;
  }

  //! ------------------------------
  static add<S extends number>(...vectors: Vector<S>[]): Vector<S> {
    return vectors.reduce((vAcc, vCur) => {
      const newData = new Array<number>(vAcc.size).fill(0);

      for (let i = 0; i < vectors[0].size; i++) {
        newData[i] += vAcc.data[i] + vCur.data[i];
      }

      return new Vector<S>(newData as FixedSizeVector<S>);
    }, new Vector<S>(Array(vectors[0].size).fill(0) as FixedSizeVector<S>));
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

  set data(newData: FixedSizeVector<L>) {
    this.#data = newData;
  }

  get size() {
    return this.#size;
  }
}

export default Vector;
