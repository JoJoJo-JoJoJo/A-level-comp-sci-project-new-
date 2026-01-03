function genInitGrid(cols: number, rows: number) {
  const grid = [];

  for (let y = 0; y < rows; y++) {
    const row = [];

    for (let x = 0; x < cols; x++) {
      const cell = JSON.parse(
        JSON.stringify({
          gen: {
            pos: [-1, -1],
          },
        })
      );
      cell.gen.pos = [x, y];
      row.push(cell);
    }

    grid.push(row);
  }

  console.table(grid);

  return grid;
}

export default genInitGrid;

// COL - x, ROW - y
/**
 *   COL COL COL COL
 *    |   |   |   |
 * [
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 *  [{}, {}, {}, {}] <- ROW
 * ]
 *
 * [x, y] => [COL, ROW]
 */
