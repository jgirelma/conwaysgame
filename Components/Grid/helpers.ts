const offsets = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function validIndex(coords: [number, number], gridSize: number) {
  const [x,y] = coords;
  return (
    x >= 0 && x < gridSize
    && y >= 0 && y < gridSize
  )
}

function getLiveNeighbors(coords: [number,number], gridSize: number, grid: number[][]) {
  const [x,y] = coords;
  let count = 0;
  for (const [xOffset, yOffset] of offsets) {
    if (validIndex([x + xOffset, y + yOffset], gridSize) && grid[x + xOffset][y + yOffset] === 1)
      count += 1;
  }
  return count;
}

export function getNextGrid(grid : number[][], gridSize : number) {
  return grid.map((colArr, colIndex) => {
    return colArr.map((value, rowIndex) => {
      const aliveNeighbors = getLiveNeighbors([colIndex, rowIndex], gridSize, grid);
      if (value === 1 && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
        return 1;
      }
      if (value === 0 && aliveNeighbors === 3) {
        return 1;
      }
      return 0;
    })
  });
}

export function getNextDeadGrid(grid : number[][], gridSize : number) {
  return grid.map((colArr, colIndex) => {
    return colArr.map((value, rowIndex) => {
      const aliveNeighbors = getLiveNeighbors([colIndex, rowIndex], gridSize, grid);
      if (value === 1 && !(aliveNeighbors === 2 || aliveNeighbors === 3)) {
        return 1;
      }
      return 0;
    })
  });
}

export function toggleSquare(grid: number[][], coords: [number, number]) {
  const [x,y] = coords;
  const newGrid = [...grid]
  newGrid[x][y] = newGrid[x][y] ? 0 : 1;
  return newGrid;
}

export async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}