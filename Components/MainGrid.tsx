import useGrid from "./Grid/hooks/useGrid"
import Grid from "./Grid"
import { Dispatch, SetStateAction } from "react"

interface PropType {
  running: boolean,
  setRunning: Dispatch<SetStateAction<boolean>>,
  gridSize: number,
  setGridSize: Dispatch<SetStateAction<number>>
}

export default function MainGrid({ running, setRunning, setGridSize, gridSize} : PropType) {
  const {state, mouseEventHandlers} = useGrid({running, setRunning, setGridSize, gridSize})

  return (
    <Grid {...state} {...mouseEventHandlers} ></Grid>
  )
}