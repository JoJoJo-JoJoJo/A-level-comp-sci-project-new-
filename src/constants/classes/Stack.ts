type StackProps<T> = {
  // Should have --> #data: T[];
  push(item: T): void;
  pop(): T | undefined;
  get size(): number;
  peek(): T | undefined;
};

class Stack<T> implements StackProps<T> {
  // Top of stack is first element in array
  #data: T[];

  constructor() {
    this.#data = [];
  }

  push(item: T): void {
    this.#data.unshift(item);
  }

  pop(): T | undefined {
    return this.#data.shift();
  }

  get size(): number {
    return this.#data.length;
  }

  peek(): T | undefined {
    return this.#data[0] ?? undefined;
  }
}

export default Stack;
export type { StackProps };
