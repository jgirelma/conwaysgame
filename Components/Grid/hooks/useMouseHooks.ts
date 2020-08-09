import { useCallback, useRef, Dispatch, SetStateAction } from "react";
import { toggleSquare } from "../helpers";

const useMouseHooks = (setGrid : Dispatch<SetStateAction<number[][]>>) => {
  const mouseDownRef = useRef(false)

  const onDragStart = useCallback((e: any) => e.preventDefault(), []);

  const onMouseDownCreator = useCallback((coords) => {
    return () => {
      mouseDownRef.current = true;
      setGrid((oldGrid) => {
        return toggleSquare(oldGrid, coords);
      });
    };
  }, []);

  const onMouseEnterCreator = useCallback((coords) => {
    return () => {
      if (mouseDownRef.current) {
        setGrid((oldGrid) => {
          return toggleSquare(oldGrid, coords);
        });
      }
    };
  }, []);

  const onMouseUp = useCallback(() => {
    mouseDownRef.current = false;
  }, []);

  return {onDragStart, onMouseDownCreator, onMouseEnterCreator, onMouseUp, onMouseLeave : onMouseUp}
}

export default useMouseHooks