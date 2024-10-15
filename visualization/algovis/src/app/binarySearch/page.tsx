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

function binarySearch(array:Array<number>, term: number, leading = 0,layer=0,callback:Function,complete:Function) {
    const m = Math.floor((array.length - 1) / 2);
    if (array.length === 0) {
        complete({i:undefined});
      return;
    }
    if (array[m] < term) {
    callback({compare:array[m],layer,leading:leading,array:array})
      return binarySearch(
        array.slice(m + 1, array.length),
        term,
        leading + m + 1,
        layer+1,
        callback,
        complete
      );
    } else if (array[m] > term) {
        callback({compare:array[m],layer,leading:leading,array:array})

    return binarySearch(array.slice(0, m + 1), term, leading,layer+1,callback,complete);
    } else {
        callback({compare:array[m],layer,leading:leading,array:array})
        complete({i:m+leading});
      return m + leading;
    }
  }




export default function Page() {
    const [compare, setCompare] = useState<number|undefined>(undefined);
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
            // setI(0);
            setFound(undefined);
            setExecuting(true);
            binarySearch(numbers,searchTerm,0,0,async (props:{compare:number,layer:number, leading:number,array:Array<number>})=>{
                setCompare(props.compare)
                console.log("here3",props.compare)
                // if (numbers[props.i] === searchTerm){
                //     setFound(props.i)
                //     setExecuting(false)
                // }
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log("here5",props.compare)
                
            },(props:{i:number})=>{
                if (numbers[props.i] === searchTerm){
                    setFound(props.i)
                }
                else{
                    console.log("here6",props.i)
                    setCompare(undefined)
                }
                setExecuting(false)
            })
            console.log("done")
            // useSetInterval(algorithmStep,1000);
        }
            
    };
    // Test call of binary search with a sorted array
    const testArray = [1, 3, 5, 7, 9, 11, 13, 15];
    const testTerm = 7;
    
    const testBinarySearch = () => {
        binarySearch(testArray, testTerm, 0, 0, 
            (props: { compare: number, layer: number, leading: number, array: Array<number> }) => {
                console.log(`Comparing at index ${props.compare} layer ${props.layer} leading ${props.leading} array ${props.array}`);
            },
            (props: { i: number | undefined }) => {
                if (props.i !== undefined) {
                    console.log(`Found ${testTerm} at index ${props.i}`);
                } else {
                    console.log(`${testTerm} not found in the array`);
                }
            }
        );
    };

    // Call the test function
    useEffect(() => {
        testBinarySearch();
    }, []);
    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };

    return (
        <div>
            <h1>Binary Search</h1>
            

        </div>
    )
}

// add animations
// add highlight for currently selected item
//add set searchTerm entry
// add "computer consciousness" area
//make searcher change color when it finds