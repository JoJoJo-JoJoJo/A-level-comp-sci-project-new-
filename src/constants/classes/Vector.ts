import { FixedSizeVector, VectorProps } from "../types";

class Vector<L extends number> implements VectorProps<L> {
  #data: FixedSizeVector<L>;
  #length: number;

  constructor(tuple: FixedSizeVector<L>) {
    this.#data = tuple;
    this.#length = tuple.length;
  }

  //! To +/-, vectors must be the same size!!!

  // upgrade to add any number of vectors
  static add(vectors: Vector<number>[]) {
    return vectors.reduce(
      (vAcc: Vector<number>, vCur: Vector<number>): Vector<number> => {
        const sumArr: number[] = new Array(this.#length);
        for (let i = 0; i < this.#length; i++) {
          sumArr[i] += this.#data[i] + vector.data[i];
        }
        return sumArr;
      }
    );
  }

  // upgrade to add any number of vectors (i.e. add all parameter vectors and use as 2nd vector to subtract)
  subtract(vector: unknown): Vector<L> {
    const sumArr: number[] = new Array(this.#length);
    for (let i = 0; i < this.#length; i++) {
      sumArr[i] += this.#data[i] - vector.data[i];
    }
    return new Vector(sumArr);
  }

  get data() {
    return this.#data;
  }

  get size() {
    return this.#length;
  }
}

export default Vector;
