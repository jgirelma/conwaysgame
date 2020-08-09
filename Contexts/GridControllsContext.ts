import { createContext, SetStateAction, Dispatch } from "react";

export interface MainGridControllsContextInterface {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  gridSize: number;
  setGridSize: Dispatch<SetStateAction<number>>;
  randomize: boolean;
  setRandomize: Dispatch<SetStateAction<boolean>>;

}

const GridControllsContext = createContext<
  MainGridControllsContextInterface
>({} as MainGridControllsContextInterface);

export default GridControllsContext;
