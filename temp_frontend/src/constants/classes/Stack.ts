type StackProps<T> = {
  //? Should have --> #data: T[];
  push(item: T): void;
  pop(): T | undefined;
  get size(): number;
  peek(): T | undefined;
};

class Stack<T> implements StackProps<T> {
  //? Top of stack is first element in array
  #data: T[];

  constructor(_data = []) {
    this.#data = _data;
  }

  //? pushes item to top of stack
  push(item: T): void {
    this.#data.unshift(item);
  }

  //? pops item off top of stack + returns item
  pop(): T | undefined {
    return this.#data.shift();
  }

  //? getter method for size of stack
  get size(): number {
    return this.#data.length;
  }

  //? returns data from top of stack without changing contents
  peek(): T | undefined {
    return this.#data[0] ?? undefined;
  }
}

export default Stack;
export type { StackProps };
