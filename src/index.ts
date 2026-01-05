import Vector from "./constants/classes/Vector";
import createMaze from "./utils/createMaze";

// const root = document!.getElementById("root");

console.table(createMaze(10, 10, new Vector<2>([0, 0])));
