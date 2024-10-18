"use client";

import React, { createRef, useState, forwardRef } from "react";




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
            {/* this is kind of hard to parse, maybe leave a comment to help the reader understand what you're up to. */}
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

Circle.displayName = "Circle";

const PlusButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-20 h-20 rounded-full bg-green-500 border-4 border-green-700 flex items-center justify-center text-white font-bold text-3xl shadow-md hover:bg-green-400 transition-colors duration-300"
    >
        +
    </button>
);


type onUpdateFunction = (state: { i: number }) => Promise<void>

async function linearSearch(array: Array<number>, term: number, onUpdate?: onUpdateFunction) {
    for (let i = 0; i < array.length; i++) {
        if (onUpdate) await onUpdate({ i });
        if (array[i] === term) {
            return i;
        }
    }
    return undefined;
}




export default function Page() {
    const [numbers, setNumbers] = useState<number[]>([0, 1, 1, 2]);
    const [searchTerm, setSearchTerm] = useState<number>(7);
    const [i, setI] = useState<number | undefined>(undefined);
    const [executing, setExecuting] = useState<boolean>(false);
    const [found, setFound] = useState<number | undefined>();

    // const [circleRefs,setCircleRefs] = useState<null|RefObject<HTMLDivElement>[]>(null)
    // useEffect(()=> {
    //     const circleRefs =  numbers.map(() => createRef<HTMLDivElement>())
    //     setCircleRefs(circleRefs)
    // }, [numbers])
    const circleRefs = numbers.map(() => createRef<HTMLDivElement>())

    const execute = () => {
        console.log("here", searchTerm, executing)
        if (searchTerm !== null && !executing) {
            console.log("here2")
            // setI(0);
            setFound(undefined);
            setExecuting(true);
            const result = linearSearch(numbers, searchTerm, async (state: { i: number }) => {
                setI(state.i)
                console.log("here3", state.i)
                // if (numbers[state.i] === searchTerm){
                //     setFound(state.i)
                //     setExecuting(false)
                // }
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("here5", state.i)

            })

            result.then((result) => {
                setExecuting(false);
                setFound(result)
            }).catch((error) => {
                console.error("An error occurred during search:", error);
                setExecuting(false);
            });
            // useSetInterval(algorithmStep,1000);
        }

    };

    // const algorithmStep = () => {
    //     if (i! < numbers.length && searchTerm !== null) {
    //         console.log(numbers[i],searchTerm)
    //         if (numbers[i] === searchTerm) {
    //             console.log("found!")
    //             // Found the search term
    //             setFound(i)
    //             setExecuting(false);
    //         } else {
    //             // Move to the next element
    //             setI(i!+1);
    //             // setTimeout(algorithmStep, 1000); // Delay for visualization
    //         }
    //     } else {
    //         // Search complete, term not found
    //         setExecuting(false);
    //     }
    // };
    // useSetInterval(algorithmStep, executing ? 1000 : null);


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

                        {/* only render this when we're executing?? */}
                        {i !== undefined && index === i && (
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