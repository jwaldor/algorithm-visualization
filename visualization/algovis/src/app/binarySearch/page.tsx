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

async function binarySearch(array:Array<number>, term: number, leading = 0,layer=0,callback:Function,complete:Function) {
    const m = Math.floor((array.length - 1) / 2);
    console.log("callback",array[m],array)
    await callback({compare:array[m],layer,leading:leading,array:array})
    if (array.length === 0) {
        complete({compare:undefined,layer:layer,leading:leading,array:[array[m+leading]]});;
    }
    if (array[m] < term) {
      binarySearch(
        array.slice(m + 1, array.length),
        term,
        leading + m + 1,
        layer+1,
        callback,
        complete
      );
    } else if (array[m] > term) {

     binarySearch(array.slice(0, m + 1), term, leading,layer+1,callback,complete);
    } else {
        complete({compare:m+leading,layer:layer,leading:leading+m,array:[array[m]]});
    }
  }




export default function Page() {
    const [compare, setCompare] = useState<number|undefined>(undefined);
    const [numbers, setNumbers] = useState<number[]>([1,3,5,7,9,11,13,15]);
    const [searchTerm, setSearchTerm] = useState<number | null>(5);
    const [executing, setExecuting] = useState<boolean>(false);
    const [found, setFound] = useState<number|undefined>();
    const [searchSteps,setSearchSteps] = useState<Array<{compare:number,layer:number, leading:number,array:Array<number>}>>([]);

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
            // setI(0);
            setFound(undefined);
            setExecuting(true);
            binarySearch(numbers,searchTerm,0,0,async (props:{compare:number,layer:number, leading:number,array:Array<number>})=>{
                setSearchSteps(prevSteps => [...prevSteps, {
                    compare: props.compare,
                    layer: props.layer,
                    leading: props.leading,
                    array: props.array
                }]);
                console.log("here3", props.compare);
                // if (numbers[props.i] === searchTerm){
                //     setFound(props.i)
                //     setExecuting(false)
                // }
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("here5",props.compare)
                
            },(props:{compare:number,layer:number,leading:number,array:Array<number>})=>{
                if (numbers[props.compare] === searchTerm){
                    setFound(props.compare)
                    setSearchSteps(prevSteps => [...prevSteps, {
                        compare: props.compare,
                        layer: props.layer,
                        leading: props.leading,
                        array: props.array
                    }]);
                }
                else{
                    console.log("here6",props.compare)
                }
                setExecuting(false)
            })
            console.log("done")
            // useSetInterval(algorithmStep,1000);
        }
            
    };
    // Test call of binary search with a sorted array
    const testArray = [1, 3, 5, 7, 9, 11, 13, 15];
    const testTerm = 5;
    
    const testBinarySearch = () => {
        binarySearch(testArray, testTerm, 0, 0, 
            (props: { compare: number, layer: number, leading: number, array: Array<number> }) => {
                console.log(`Comparing at index ${props.compare} layer ${props.layer} leading ${props.leading} array ${props.array}`);
            },
            (props: { compare: number | undefined }) => {
                if (props.compare !== undefined) {
                    console.log(`Found ${testTerm} at index ${props.compare}`);
                } else {
                    console.log(`${testTerm} not found in the array`);
                }
            }
        );
    };

    // Call the test function
    // useEffect(() => {
    //     testBinarySearch();
    //     setNumbers([1,3,5,7,9,11,13,15])
    //     setSearchTerm(5)
    // }, []);
    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };

    // useEffect(()=>{
    //     console.log("executing")
    //     execute()
    // },[numbers,searchTerm])
    // useEffect(()=>{
    //     console.log("searchSteps",searchSteps)
    // },[searchSteps])
    console.log(searchSteps,"searchSteps")
    return (
        <div>
            <h1>Binary Search</h1>
            <div className="flex flex-row justify-center gap-4 my-4">
                <div className="flex items-center justify-center mb-4">
                    <input
                        type="number"
                        value={searchTerm !== null ? searchTerm : ''}
                        onChange={(e) => {
                            setSearchTerm(Number(e.target.value))
                            setCompare(undefined)
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
                    </div>
                ))}
                <PlusButton onClick={handleAddNumber} />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Search Steps</h2>
                {searchSteps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex flex-row items-center mb-4">
                        <span className="mr-4 font-semibold">Step {stepIndex + 1}:</span>
                        <div className="flex flex-row">
                            {[...Array(step.leading).fill(undefined), ...step.array].map((number, index) => (
                                
                                number === undefined ? <div
                                key={index}
                                className={`w-10 h-10 rounded-full ${
                                    index === step.compare ? 'bg-yellow-400 border-yellow-600' :
                                    number === searchTerm ? 'bg-green-500 border-green-600' :
                                    'bg-blue-400  border-blue-600'
                                } border-2 flex items-center justify-center text-white text-sm mr-2 bg-transparent border-none`}
                            >
                                {number}
                            </div> :
                                <div
                                    key={index}
                                    className={`w-10 h-10 rounded-full ${
                                        'bg-blue-400  border-blue-600'
                                    } border-2 flex items-center justify-center text-white text-sm mr-2`}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}

//use compare to highlight found item + search focus?


// add animations
// add highlight for currently selected item
//add set searchTerm entry
// add "computer consciousness" area
//make searcher change color when it finds
