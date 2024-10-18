"use client";
import { binarySearch, Frame, Frames, makeFrames } from "@/services/binarysearch/binarysearch";
import { CallbackArgs } from "@/services/binarysearch/binarysearch";

import React, { createRef, useState, forwardRef } from "react";




interface CircleProps {
    entry: number;
    array: number[];
    executing: boolean;
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    color: string;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ entry, executing, array, setNumbers, color }, ref) => {
    const baseClasses = "w-20 h-20 rounded-full grid place-items-center text-white font-bold shadow-md transition-all duration-300";
    const colorClasses = color

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

Circle.displayName = "Circle";

const PlusButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-20 h-20 rounded-full bg-green-500 border-4 border-green-700 flex items-center justify-center text-white font-bold text-3xl shadow-md hover:bg-green-400 transition-colors duration-300"
    >
        +
    </button>
);






export default function Page() {
    const [numbers, setNumbers] = useState<number[]>([1, 3, 5, 7, 9, 11, 13, 15, 19]);
    const [searchTerm, setSearchTerm] = useState<number | null>(5);
    const [executing, setExecuting] = useState<boolean>(false);
    // const [searchSteps, setSearchSteps] = useState<Array<CallbackArgs>>([]);
    const [showingframes, setShowingFrames] = useState<Frames>([]);


    const execute = () => {
        setShowingFrames([])

        if (searchTerm !== null && !executing) {

            setExecuting(true);
            const searchSteps: Array<CallbackArgs> = []
            function addSearchStep(searchStep: CallbackArgs) {
                searchSteps.push(searchStep)
            }
            binarySearch(numbers, searchTerm, (searchStep: CallbackArgs) => { addSearchStep(searchStep) })
            const allFrames = makeFrames(searchSteps);
            console.log(allFrames, "allFrames")
            let frameIndex = 0;

            const animateFrames = () => {
                if (frameIndex < allFrames.length + 1) {
                    console.log(frameIndex, "frameIndex", allFrames[frameIndex], "allFrames[frameIndex]")
                    setShowingFrames(allFrames.slice(0, frameIndex));
                    frameIndex++;
                    setTimeout(animateFrames, 1000); // Delay of 1 second between frames
                } else {
                    setExecuting(false);
                }
            };

            animateFrames();



        }

    };



    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };



    return (
        <div>
            <h1>Binary Search</h1>
            {/* //Here, you can define the search term and the array that you want to search */}
            <div className="flex flex-row justify-center gap-4 my-4">
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
                    <input
                        type="number"
                        value={searchTerm !== null ? searchTerm : ''}
                        onChange={(e) => {
                            setSearchTerm(Number(e.target.value))
                        }}
                        className="w-16 h-16 text-center text-xl border-2 border-gray-300 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Term"
                    />
                </div>
                {numbers.map((number, index) => (
                    <div key={index} className="flex flex-row">
                        <Circle
                            entry={index}
                            array={numbers}
                            executing={executing}
                            setNumbers={setNumbers}
                            color={"bg-blue-500 border-4 border-blue-700 hover:bg-blue-400"}
                        />
                    </div>
                ))}
                <PlusButton onClick={handleAddNumber} />
            </div>
            {showingframes.map((frame, index) => (
                <div key={index} className="flex flex-row">
                    {frame.map((item, index) => (
                        <div key={index} className="w-10 h-10 rounded-full bg-blue-400 border-2 border-blue-600 flex items-center justify-center text-white text-sm mr-2">
                            {item.value}
                        </div>
                    ))}
                </div>
            ))}
            {/* <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Search Steps</h2>
                {searchSteps.map((step, stepIndex) => {
                    console.log(searchSteps[searchSteps.length - 1], searchSteps[searchSteps.length - 1].array, "searchSteps")
                    console.log(searchSteps[searchSteps.length - 1].complete, "step.complete")
                    return (
                        <div key={stepIndex} className="flex flex-row items-center mb-4">
                            <span className="mr-4 font-semibold">Step {stepIndex + 1}:</span>
                            <div className="flex flex-row">
                                {[...Array(step.leading).fill(undefined), ...step.array].map((number, index) => {
                                    console.log("here6")
                                    console.log(number, "number", step.compare, "step.compare", step.array, "step.array", index, "index", step.array.length, "step.array.length", step.complete, "step.complete")
                                    // console.log(step.array.length === 1 && number === searchTerm, "step.array.length === 1 && number === searchTerm")
                                    console.log(step.array.length === 1 && number === searchTerm ? 'bg-green-500 border-green-600' :
                                        'bg-blue-400  border-blue-600')
                                    console.log(`w-10 h-10 rounded-full ${!(step.array.length === 1 && number === searchTerm) && (!(step.array.length === 1 && number === searchTerm) && index === step.compare ? 'bg-yellow-400 border-yellow-600' : 'bg-blue-400  border-blue-600')}
                                                ${step.array.length === 1 && number === searchTerm ? 'bg-green-500 border-green-600' :
                                            'bg-blue-400  border-blue-600'
                                        } border-2 flex items-center justify-center text-white text-sm mr-2 bg-transparent border-none`)
                                    return (

                                        number === undefined ? <div
                                            key={index}
                                            className={`w-10 h-10 rounded-full ${!(step.array.length === 1 && number === searchTerm) && (!(step.array.length === 1 && number === searchTerm) && index === step.compare ? 'bg-yellow-400 border-yellow-600' : 'bg-blue-400  border-blue-600')}
                                                ${step.array.length === 1 && number === searchTerm ? 'bg-green-500 border-green-600' :
                                                    'bg-blue-400  border-blue-600'
                                                } border-2 flex items-center justify-center text-white text-sm mr-2 bg-transparent border-none`}
                                        >
                                            {number}
                                        </div> :
                                            <div
                                                key={index}
                                                className={`w-10 h-10 rounded-full ${!(step.array[step.index] === 1 && number === searchTerm) && (step.index === index - step.leading ? 'bg-yellow-400 border-yellow-600' :
                                                    'bg-blue-400 border-blue-600'
                                                )} ${step.array.length === 1 && number === searchTerm && 'bg-green-500 border-green-600'} border-2 flex items-center justify-center text-white text-sm mr-2`}
                                            >
                                                {number}
                                            </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    )
                })}
            </div> */}


        </div>
    )
}

//use compare to highlight found item + search focus?


// add animations
// add highlight for currently selected item
//add set searchTerm entry
// add "computer consciousness" area
//make searcher change color when it finds
