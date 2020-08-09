import Navbar from "../Components/Navbar";
import { useState } from "react";
import Grid from "../Components/Grid";
import MainGrid from "../Components/MainGrid";

export default function Home() {
  const [gridSize, setGridSize] = useState(30);
  const [running, setRunning] = useState(false);

  return (
    <>
      <Navbar
        gridSize={gridSize}
        setGridSize={setGridSize}
        running={running}
        setRunning={setRunning}
      ></Navbar>
      <MainGrid gridSize={gridSize} setGridSize={setGridSize} running={running} setRunning={setRunning}/>
    </>
  );
}
