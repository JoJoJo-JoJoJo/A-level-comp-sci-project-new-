type DNodeProps<T> = {
  value: T;
  next: DNodeProps<T> | null;
  prev: DNodeProps<T> | null;
};

type DLinkedListProps<T> = {
  head: DNodeProps<T> | null;
  tail: DNodeProps<T> | null;
  length: number;
  insert: (value: T) => void;
  delete: (node: DNodeProps<T>) => DNodeProps<T> | null;
};

class DNode<K> implements DNodeProps<K> {
  value: K;
  next: DNodeProps<K> | null;
  prev: DNodeProps<K> | null;

  constructor(
    value: K,
    next: DNodeProps<K> | null = null,
    prev: DNodeProps<K> | null = null,
  ) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

//? When using to store maze path, the tail node represents the starting tile and the head node represents the tile that the player is currently on
class DLinkedList<K> implements DLinkedListProps<K> {
  head: DNodeProps<K> | null;
  tail: DNodeProps<K> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  //? This method inserts a node at the start of the list (i.e. in front of head node)
  insert(value: K): void {
    const node = new DNode<K>(value);

    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }

    this.head = node;
    node.prev = null;
    this.length++;
  }

  //? This method deletes a specific node from the list
  delete(node: DNodeProps<K>): DNodeProps<K> | null {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.prev = node.prev;
    }

    return node;
  }
}

export default DLinkedList;
export { DNode };
export type { DNodeProps, DLinkedListProps };
