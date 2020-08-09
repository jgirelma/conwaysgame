import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/core";
import { useContext } from "react";
import GridControllsContext from "../Contexts/GridControllsContext";

const GRID_SIZE_MAX = 40;
const GRID_SIZE_MIN = 10;

export default function Navbar() {
  const { gridSize, setGridSize, running, setRunning, setRandomize } = useContext(
    GridControllsContext
  );
  return (
    <div className="flex justify-around p-4 border-b-2">
      <div className="text-2xl">Conway's Game of Life</div>
      <div className="flex space-x-4 items-center text-lg">
        <div>Grid Size:</div>
        <NumberInput
          width="80px"
          size="md"
          min={GRID_SIZE_MIN}
          max={GRID_SIZE_MAX}
          value={gridSize}
          onChange={(val) => {
            const numericalVal = parseInt(val.toString(), 10);
            setRunning(false);
            if (numericalVal > GRID_SIZE_MAX) {
              setGridSize(GRID_SIZE_MAX);
            } else if (numericalVal < GRID_SIZE_MIN) {
              setGridSize(GRID_SIZE_MIN);
            } else {
              setGridSize(parseInt(val.toString(), 10));
            }
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          variantColor={`${running ? "red" : "green"}`}
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </Button>

        <Button
          variantColor="orange"
          onClick={() => setRandomize(true)}
        >
          Randomize
        </Button>
      </div>
    </div>
  );
}
