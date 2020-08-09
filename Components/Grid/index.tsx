import { Dispatch, SetStateAction } from "react";

interface PropType {
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  grid: number[][];
  setGrid: Dispatch<SetStateAction<number[][]>>;
  dyingGrid: number[][];
  setDyingGrid: Dispatch<SetStateAction<number[][]>>;
  onDragStart: (e: any) => any;
  onMouseDownCreator: (coords: any) => () => void;
  onMouseEnterCreator: (coords: any) => () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export default function Grid({
  onDragStart,
  onMouseLeave,
  onMouseDownCreator,
  onMouseEnterCreator,
  onMouseUp,
  gridSize,
  running,
  grid,
  dyingGrid,
}: PropType) {
  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <div
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 20px)`,
        }}
        className="inline-grid"
        onMouseLeave={onMouseLeave}
      >
        {grid.map((colArr, colIndex) => {
          return colArr.map((value, rowIndex) => {
            return (
              <div
                className="square"
                style={{
                  width: "20px",
                  height: "20px",
                  border: "solid 1px black",
                  background: dyingGrid[colIndex][rowIndex]
                    ? "red"
                    : value
                    ? "green"
                    : "none",
                  transition: running ? `background .25s` : "none",
                }}
                key={`${[colIndex, rowIndex]}`}
                onDragStart={onDragStart}
                onMouseDown={onMouseDownCreator([colIndex, rowIndex])}
                onMouseUp={onMouseUp}
                onMouseEnter={onMouseEnterCreator([colIndex, rowIndex])}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
}
