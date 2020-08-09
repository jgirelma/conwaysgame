import Navbar from "../Components/Navbar";
import { useState } from "react";
import Grid from "../Components/Grid";
import GridControllsContext from "../Contexts/GridControllsContext";
import Examples from "../Components/Examples";

export default function Home() {
  const [gridSize, setGridSize] = useState(30);
  const [randomize, setRandomize] = useState(true)
  const [running, setRunning] = useState(false);

  return (
    <GridControllsContext.Provider
      value={{ gridSize, setGridSize, running, setRunning, randomize, setRandomize }}
    >
      <Navbar />
      <div className="mt-4 lg:grid grid-cols-3">
        <Grid />
        {/* <Examples /> */}
      </div>
    </GridControllsContext.Provider>
  );
}
