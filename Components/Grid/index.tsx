import { useState, useRef, useEffect, useContext } from "react";
import useMouseHooks from "./hooks/useMouseHooks";
import { getNextDeadGrid, getNextGrid, sleep } from "./helpers";
import GridControllsContext from "../../Contexts/GridControllsContext";

export default function Grid() {
  const { running, gridSize, randomize, setRandomize } = useContext(
    GridControllsContext
  );
  const [grid, setGrid] = useState<number[][]>([]);
  const [dyingGrid, setDyingGrid] = useState<number[][]>([]);
  const runningRef = useRef<boolean>(running);

  const mouseEventHandlers = useMouseHooks(setGrid);

  useEffect(() => {
    runningRef.current = running;
    if (running) {
      requestAnimationFrame(draw);
    }
  }, [running]);

  useEffect(() => {
    if (randomize) {
      setGrid(
        Array(gridSize)
          .fill(undefined)
          .map(() => Array(gridSize).fill(undefined).map(() => Math.round(Math.random())))
      );
      setDyingGrid(
        Array(gridSize)
          .fill(undefined)
          .map(() => Array(gridSize).fill(0))
      );
      setRandomize(false);
    }
  }, [randomize]);

  useEffect(() => {
    setGrid(
      Array(gridSize)
        .fill(undefined)
        .map(() => Array(gridSize).fill(0))
    );
    setDyingGrid(
      Array(gridSize)
        .fill(undefined)
        .map(() => Array(gridSize).fill(0))
    );
  }, [gridSize]);

  async function draw() {
    if (runningRef.current) {
      setGrid((oldGrid) => {
        setDyingGrid(getNextDeadGrid(oldGrid, gridSize));
        return oldGrid;
      });

      setGrid((oldGrid) => {
        return getNextGrid(oldGrid, gridSize);
      });

      await sleep(500);

      requestAnimationFrame(draw);
    }
  }

  return (
    <div className="col-start-2 col-end-3 flex justify-center">
      <div>
        <div
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 20px)`,
          }}
          className="grid"
          onMouseLeave={mouseEventHandlers.onMouseLeave}
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
                  onDragStart={mouseEventHandlers.onDragStart}
                  onMouseDown={mouseEventHandlers.onMouseDownCreator([
                    colIndex,
                    rowIndex,
                  ])}
                  onMouseUp={mouseEventHandlers.onMouseUp}
                  onMouseEnter={mouseEventHandlers.onMouseEnterCreator([
                    colIndex,
                    rowIndex,
                  ])}
                ></div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
