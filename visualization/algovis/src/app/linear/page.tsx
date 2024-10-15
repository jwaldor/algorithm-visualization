"use client";

import { createRef, useMemo, useState, forwardRef, useEffect, RefObject, useRef } from "react";

interface CircleProps {
    entry: number;
    array: number[];
    executing: boolean;
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    found: number | undefined;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ entry, executing, array, setNumbers, found }, ref) => {
    const isFound = found === entry;
    const baseClasses = "w-20 h-20 rounded-full grid place-items-center text-white font-bold shadow-md transition-all duration-300";
    const colorClasses = isFound
        ? "bg-purple-500 border-4 border-purple-700 hover:bg-purple-400"
        : "bg-blue-500 border-4 border-blue-700 hover:bg-blue-400";

    return (
        <div ref={ref} className={`${baseClasses} ${colorClasses}`}>
            {executing ? (
                array[entry]
            ) : (
                <input
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
    );
});

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
    const [i, setI] = useState<number|undefined>(undefined);
    const [numbers, setNumbers] = useState<number[]>([0,1,1,2]);
    const [searchTerm, setSearchTerm] = useState<number | null>(7);
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
            setFound(undefined);
            setExecuting(true);
            // useSetInterval(algorithmStep,1000);
        }
            
    };

    const algorithmStep = () => {
        if (i! < numbers.length && searchTerm !== null) {
            console.log(numbers[i],searchTerm)
            if (numbers[i] === searchTerm) {
                console.log("found!")
                // Found the search term
                setFound(i)
                setExecuting(false);
            } else {
                // Move to the next element
                setI(i!+1);
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
                    <input
                        type="number"
                        value={searchTerm !== null ? searchTerm : ''}
                        onChange={(e) => {
                            setSearchTerm(Number(e.target.value))
                            setI(undefined)
                        }}
                        className="w-16 h-16 text-center text-xl border-2 border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Term"
                    />
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
                            found={found}
                        />
                        
                        {i !== undefined && searchTerm !== null && index === i && (
                            <div className={`ml-4 w-20 h-20 rounded-full ${found !== undefined ? 'bg-purple-500 border-purple-600' : 'bg-red-400 border-red-600'} border-4 grid place-items-center text-white`}>
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
// add "computer consciousness" area
//make searcher change color when it finds