"use client";

import { createRef, useMemo, useState, forwardRef, useEffect, RefObject, useRef } from "react";

interface CircleProps {
    entry: number;
    array: number[];
    executing: Boolean;
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ entry, executing, array, setNumbers }, ref) => (
    <div ref={ref} className="w-20 h-20 rounded-full bg-blue-500 border-4 border-blue-700 grid place-items-center text-white font-bold shadow-md hover:bg-blue-400 transition-colors duration-300">
        {executing ? (
            array[entry]
        ) : (
            <input
                // type="number"
                value={array[entry]}
                onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    if (!isNaN(newValue)) {
                        const newArray = [...array];
                        newArray[entry] = newValue;
                        setNumbers(newArray);
                    }
                }}
                className="w-full h-full bg-transparent text-center text-white outline-none"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
        )}
    </div>
));

const PlusButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-20 h-20 rounded-full bg-green-500 border-4 border-green-700 flex items-center justify-center text-white font-bold text-3xl shadow-md hover:bg-green-400 transition-colors duration-300"
    >
        +
    </button>
);

function linearSearch(array:Array<number>, term: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === term) {
        return i;
      }
    }
    return;
  }


function useSetInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default function Page() {
    const [i, setI] = useState(0);
    const [numbers, setNumbers] = useState<number[]>([0,1,1,2]);
    const [searchTerm, setSearchTerm] = useState<number | null>(1);
    const [executing, setExecuting] = useState<boolean>(false);
    const [found, setFound] = useState<number|undefined>();

    // const [circleRefs,setCircleRefs] = useState<null|RefObject<HTMLDivElement>[]>(null)
    // useEffect(()=> {
    //     const circleRefs =  numbers.map(() => createRef<HTMLDivElement>())
    //     setCircleRefs(circleRefs)
    // }, [numbers])
        const circleRefs =  numbers.map(() => createRef<HTMLDivElement>())
    
    const execute = () => {
        console.log("here",searchTerm,executing)
        if (searchTerm !== null && !executing){
            console.log("here2")
            setI(0);
            setExecuting(true);
            // useSetInterval(algorithmStep,1000);
        }
            
    };

    const algorithmStep = () => {
        if (i < numbers.length && searchTerm !== null) {
            console.log(numbers[i],searchTerm)
            if (numbers[i] === searchTerm) {
                console.log("found!")
                // Found the search term
                setFound(i)
                setExecuting(false);
            } else {
                // Move to the next element
                setI(i+1);
                // setTimeout(algorithmStep, 1000); // Delay for visualization
            }
        } else {
            // Search complete, term not found
            setExecuting(false);
        }
    };
    useSetInterval(algorithmStep, executing ? 1000 : null);


    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };

    return (
        <div>
            <h1>Linear</h1>
            <div className="flex flex-col justify-center gap-4 my-4">
                <div className="flex items-center justify-center mb-4">
                    <button
                        onClick={execute}
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
                        disabled={executing}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {numbers.map((number, index) => (
                    <div key={index} className="flex flex-row">
                        <Circle
                            ref={circleRefs[index]}
                            entry={index}
                            array={numbers}
                            executing={executing}
                            setNumbers={setNumbers}
                        />
                        
                        {executing && searchTerm !== null && index === i && (
                            <div className="ml-4 w-20 h-20 rounded-full bg-red-400 border-4 border-red-600 grid place-items-center text-white">
                                {searchTerm}
                            </div>
                        )}
                    </div>
                ))}
                <PlusButton onClick={handleAddNumber} />
            </div>
        </div>
    )

  }

  // add animations
  // add highlight for currently selected item
  //add set searchTerm entry