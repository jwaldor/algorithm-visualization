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


type onUpdateFunction = (state: {position:Array<any>}) => void

function depthFirstSearch(tree: any, term: any, position: Array<any> = [],callback?: onUpdateFunction): any {
    for (let i = 0; i < tree.length; i++) {
      if (callback){
        callback({position:position.concat(i)})
      }
      if (tree[i].value === term) {
        position = position.concat(i);
        return { position };
      } else {
        if (tree[i].children.length > 0) {
          const d: any = depthFirstSearch(tree[i].children, term, position.concat(i));
          if (d) {
            return d;
          }
        }
      }
    }
  }



export default function Page() {

    const [state, setState]  = useState<{visualizationData:Object,searchTerm:number,position:Array<number>}>({searchTerm:3,position:[],visualizationData:{}})

    useEffect(() => {const tree = [
        {
          value: 8,
          children: [
            {
              value: 3,
              children: [
                { value: 9, children: [] },
                { value: 2, children: [{ value: 7, children: [] }] },
              ],
            },
            { value: 5, children: [] },
            {
              value: 1,
              children: [
                { value: 4, children: [] },
                { value: 6, children: [{ value: 10, children: [] }] },
              ],
            },
          ],
        },
        {
          value: 12,
          children: [
            { value: 15, children: [{ value: 11, children: [] }] },
            { value: 13, children: [] },
            {
              value: 14,
              children: [
                { value: 16, children: [{ value: 18, children: [] }] },
                { value: 17, children: [] },
              ],
            },
          ],
        },
        {
          value: 20,
          children: [
            { value: 19, children: [] },
            {
              value: 21,
              children: [
                { value: 23, children: [] },
                { value: 22, children: [{ value: 24, children: [] }] },
              ],
            },
          ],
        },
      ];
      depthFirstSearch(tree,state.searchTerm,[],(searchState) => {setState({...state, position:searchState.position})})
    setState({...state,visualizationData:tree})},[])
    
      
    //visualization components
        //show tree
        //show currently examined branch
        //show branch contents = searchTerm ?
    //callback data
      //set of positions in tree
    //UI states
      //pre-search: showing graph + search term input
      //during search: showing graph + disabling search input + highlighting current search + text indication of what's being searched
      //found results: showing graph + highlighting result  + text indication of result
      //no results: showing graph + text indicating no result

  
    return (
        <div>
            


        </div>
    )
}

//use compare to highlight found item + search focus?


// add animations
// add highlight for currently selected item
//add set searchTerm entry
// add "computer consciousness" area
//make searcher change color when it finds
