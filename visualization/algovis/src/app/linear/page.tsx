"use client";

import { createRef, useMemo, useState, forwardRef } from "react";

interface CircleProps {
    entry: number;
    array: number[];
    executing: Boolean;
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ entry, executing, array, setNumbers }, ref) => (
    <div ref={ref} className="w-20 h-20 rounded-full bg-blue-500 border-4 border-blue-700 flex items-center justify-center text-white font-bold shadow-md hover:bg-blue-400 transition-colors duration-300">
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
    
    const circleRefs = useMemo(() => numbers.map(() => createRef<HTMLDivElement>()), [numbers]);

    const handleAddNumber = () => {
        setNumbers([...numbers, 0]);
    };

    return (
        <div>
            <h1>Linear</h1>
            <div className="flex flex-col justify-center gap-4 my-4">
                {numbers.map((number, index) => (
                    <div key={index} className="relative">
                        <Circle
                            ref={circleRefs[index]}
                            entry={index}
                            array={numbers}
                            executing={executing}
                            setNumbers={setNumbers}
                        />
                    </div>
                ))}
                <PlusButton onClick={handleAddNumber} />
            </div>
            {searchTerm !== null && executing && (
                <div className="absolute" style={{
                    left: circleRefs[i].current ? `calc(${circleRefs[i].current.getBoundingClientRect().right}px + 2rem)` : '0',
                    top: circleRefs[i].current ? `${circleRefs[i].current.getBoundingClientRect().top}px` : '0',
                }}>
                    <div className="relative">
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 19L5 12L12 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-red-400 border-4 border-red-600 flex items-center justify-center text-white">
                            {searchTerm}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

  }

  // add animations
