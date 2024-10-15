"use client";

import { createRef, useMemo, useState, forwardRef, useEffect, RefObject } from "react";

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

export default function Page() {
    const [i, setI] = useState(0);
    const [numbers, setNumbers] = useState<number[]>([0]);
    const [searchTerm, setSearchTerm] = useState<number | null>(4);
    const [executing, setExecuting] = useState<boolean>(true);
    // const [circleRefs,setCircleRefs] = useState<null|RefObject<HTMLDivElement>[]>(null)
    // useEffect(()=> {
    //     const circleRefs =  numbers.map(() => createRef<HTMLDivElement>())
    //     setCircleRefs(circleRefs)
    // }, [numbers])
        const circleRefs =  numbers.map(() => createRef<HTMLDivElement>())

    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };

    return (
        <div>
            <h1>Linear</h1>
            <div className="flex flex-col justify-center gap-4 my-4">
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
