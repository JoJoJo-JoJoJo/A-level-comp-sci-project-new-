import Vector from "./constants/classes/Vector";
import createMaze from "./utils/createMaze";

// const root = document!.getElementById("root");

console.table(createMaze(9, 9, new Vector<2>([0, 0])));

//* UNIT TESTS - Vector
const v1 = new Vector<2>([1, 2]);
const v2 = new Vector<2>([3, 4]);
console.log(v1.data);
console.log(v2.data);
