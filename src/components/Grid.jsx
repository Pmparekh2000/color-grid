import React, { useEffect, useRef, useState } from 'react'
import { getGrid } from '../utils/utils';

const Grid = ({rows = 3, columns = 3}) => {

  const [grid, setGrid] = useState(() => getGrid(rows, columns));
  const gridQueueRef = useRef([]);
  const timersRef = useRef([]);

  useEffect(() => {
    return () => {
        gridQueueRef.current = null;
        timersRef.current.forEach((timerRef) => {
            clearTimeout(timerRef);
        });
    };
  }, []);

  useEffect(() => {
    if (gridQueueRef.current.length === 9) {
        gridQueueRef.current.reverse().forEach(([rowIdx, colIdx], idx) => {
            timersRef.current[idx] = setTimeout(() => {
                if (idx === timersRef.current.length - 1) {
                    timersRef.current = [];
                }
                handleColorChange(rowIdx, colIdx, false);
            }, 1000 * (idx + 1));
        });
        gridQueueRef.current = [];
    }
  }, [grid]);

  const handleColorChange = (i, j, flag) => {
    if (timersRef.current.length > 0 && flag) {
        return;
    }
    if (grid[i][j] && flag) {
        return
    }
    // Using arrow function implementation of useState setter function
    // So as to get updated grid value whenever the setTimeout cb func runs
    setGrid((prevGrid) => {
        const copyGrid = prevGrid?.map((row) => [...row]);
        copyGrid[i][j] = flag;
        if (flag) gridQueueRef.current.push([i, j]);
        return copyGrid;
    });
  };

  return (
    <div className='grid-container' style={{
        gridTemplateColumns: `repeat(${columns}, 40px)`,
        gridTemplateRows: `repeat(${rows}, 40px)`
    }}>
        {
            grid?.map((_, i) => {
                return grid[i]?.map((_, j) => {
                    return (
                        <div
                            key={i + "-" + j}
                            className='cell'
                            onClick={() => handleColorChange(i, j, true)}
                            style={{backgroundColor: grid[i][j] ? 'lightblue' : 'white'}}
                        >

                        </div>
                    )
                })
            })
        }
    </div>
  )
}

export default Grid