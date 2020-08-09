import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import useMouseHooks from "./useMouseHooks";
import { getNextDeadGrid, getNextGrid, sleep } from "../helpers";

interface PropType {
  running: boolean,
  setRunning: Dispatch<SetStateAction<boolean>>,
  gridSize: number,
  setGridSize: Dispatch<SetStateAction<number>>,
}

const useGrid = ({gridSize, setGridSize, running, setRunning} : PropType) => {

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
    setGrid(Array(gridSize).fill(undefined).map(() => Array(gridSize).fill(0)));
    setDyingGrid(Array(gridSize).fill(undefined).map(() => Array(gridSize).fill(0)));
  }, [gridSize]);

  async function draw() {
    if (runningRef.current) {
      setGrid((oldGrid) => {
        setDyingGrid(getNextDeadGrid(oldGrid, gridSize));
        return oldGrid;
      });

      // await sleep(500);

      setGrid((oldGrid) => {
        return getNextGrid(oldGrid, gridSize);
      });

      await sleep(500);

      requestAnimationFrame(draw);
    }
  }

  return {
    state: {
      gridSize,
      setGridSize,
      running,
      setRunning,
      grid,
      setGrid,
      dyingGrid,
      setDyingGrid,
    },
    mouseEventHandlers
  }
}

export default useGrid;