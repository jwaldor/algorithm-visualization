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
        console.log("position",position.concat(i),tree,)
      }
      if (tree[i].value === term) {
        position = position.concat(i);
        return { position };
      } else {
        if (tree[i].children.length > 0) {
          const d: any = depthFirstSearch(tree[i].children, term, position.concat(i),callback);
          if (d) {
            return d;
          }
        }
      }
    }
  }

// console.log("depthFirstSearch",depthFirstSearch([{value:1,children:[{value:2,children:[{value:3,children:[]}]}]}],3,[],(searchState) => {console.log("searchState",searchState)}))

const TreeNode: React.FC<{ node: any, depth: number, position: number[], state: any }> = ({ node, depth, position, state }) => {
  let isCurrentlySearched = false;
  let isFound = false;

  if (state.state[0] === "searching") {
    const currentPosition = state.state[1].positions[state.state[1].position];
    isCurrentlySearched = JSON.stringify(position) === JSON.stringify(currentPosition);
  } else if (state.state[0] === "found") {
    isFound = JSON.stringify(position) === JSON.stringify(state.state[1].position);
  }

  const nodeColor = isFound ? 'bg-purple-500' : (isCurrentlySearched ? 'bg-yellow-500' : 'bg-blue-500');
  const borderColor = isFound ? 'border-purple-700' : (isCurrentlySearched ? 'border-yellow-700' : 'border-blue-700');

  return (
    <div className={`flex flex-col items-center ${depth > 0 ? 'mt-4' : ''}`}>
      <div className="relative">
        <div className={`w-12 h-12 rounded-full ${nodeColor} border-4 ${borderColor} flex items-center justify-center text-white font-bold z-10 relative transition-colors duration-300`}>
          {node.value}
        </div>
        {depth > 0 && (
          <div className="absolute w-px h-4 bg-gray-400 top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"></div>
        )}
      </div>
      {node.children.length > 0 && (
        <>
          <div className="w-px h-4 bg-gray-400 my-2"></div>
          <div className="relative">
            <div className="absolute w-full h-px bg-gray-400 top-0 left-0"></div>
            <div className="flex space-x-8 pt-4">
              {node.children.map((child: any, index: number) => (
                <TreeNode 
                  key={index} 
                  node={child} 
                  depth={depth + 1} 
                  position={[...position, index]}
                  state={state}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};



export default function Page() {

    const [state, setState]  = useState<{visualizationData:Object,searchTerm:number,state:["pre-search"]|["searching",{position:number,positions:Array<Array<number>>,foundItem:number|undefined}]|["found",{position:Array<number>}]|["not-found"]}>({visualizationData:{},searchTerm:6,state:["pre-search"]})

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
      depthFirstSearch(tree,state.searchTerm,[],(searchState) => {
        setState(prevState => ({...prevState, position:searchState.position}))
        console.log("positioncallback",searchState.position)
    })
    setState({...state,visualizationData:tree})},[])

    function handleStartSearch(){
      if (state.state[0] !== "searching"){
      setState({...state,state:["searching",{position:0,positions:[],foundItem:undefined}]})
      const result = depthFirstSearch(state.visualizationData,state.searchTerm,[],(searchState) => {
        setState(prevState => ({...prevState, state:["searching",{position:0,positions:(prevState.state[1] as {position: number, positions: Array<Array<number>>,foundItem:number|undefined}).positions.concat([searchState.position]),foundItem:(prevState.state[1] as {position: number, positions: Array<Array<number>>,foundItem:number|undefined}).foundItem}]}))
        console.log("positioncallback",searchState.position)
        setState(prevState => ({...prevState, state:["searching",{position:0,positions:(prevState.state[1] as {position: number, positions: Array<Array<number>>,foundItem:number|undefined}).positions,foundItem:result}]}))
    })
    // Set up an interval to update the position every second
    const intervalId = setInterval(() => {
      setState(prevState => {
        if (prevState.state[0] === "searching") {
          const currentPositions = (prevState.state[1] as {position: number, positions: Array<Array<number>>}).positions;
          const newPosition = Math.min((prevState.state[1] as {position: number}).position + 1, currentPositions.length - 1);
          
          console.log(`Updating position: ${newPosition}`);
          
          // Check if we've reached the end of the positions array
          if (newPosition === currentPositions.length - 1) {
            console.log("Search complete, clearing interval");
            clearInterval(intervalId);
            if (prevState.state[1].foundItem){
              setState({
                ...prevState,
                state: ["found", {
                  position: currentPositions[currentPositions.length-1],
                }]
              })
            }
            else{
              setState({
                ...prevState,
                state: ["not-found"]
              })
            }
              return {
              ...prevState,
              state: ["searching", {
                position: newPosition,
                positions: currentPositions,
                foundItem: prevState.state[1].foundItem
              }]
            };
          }
          
          return {
            ...prevState,
            state: ["searching", {
              position: newPosition,
              positions: currentPositions,
              foundItem: prevState.state[1].foundItem
            }]
          };
        }
        return prevState;
      });
    }, 1000);
    
    // Clear the interval when the component unmounts
    }
    }

    console.log("state",state)
    //visualization components
        //show tree
        //show currently examined branch
        //show branch contents = searchTerm ?
        //input for search term
    //callback data
      //set of positions in tree
    //UI states
      //pre-search: showing graph + search term input
      //during search: showing graph + disabling search input + highlighting current search + text indication of what's being searched
      //found results: showing graph + highlighting result  + text indication of result
      //no results: showing graph + text indicating no result

      //set up functions to handle state changes

      //animate search:
        //display tree
        //highlight current search position
        //make text that indicates what's being searched
        //loop through search positions in a time-dependent manner
        //handle completion of loop. when nothing is left in positions, check if the search term was found. if so, set state to found. if not, set it to not found.
      //create display for found
        //text indicates that we found it
        //tree highlights the place where we found it
      //create display for no results
        //text highlights that we didn't find it
      
        //render value of currently highlighted node during search
            //function for obtaining value of currently highlighted node
            //call that function conditionally based on state and display the result

      
        //additional:
          //add input for search term
          //allow you to modify tree

          //problem with how I'm doing setInterval? should be cleaning up/useSetInterval?

          //animate changing of currently highlighted node + appearance of search result

    const getCurrentlyHighlightedValue = () => {

      const { position, positions } = state.state[1] as { position: number, positions: Array<Array<number>> };
      const currentPosition = positions[position];
      let currentNode: any = state.visualizationData;
      for (const index of currentPosition.slice(0,-1)) {
        currentNode = currentNode[index];
        if (currentNode.children) {
          currentNode = currentNode.children;
        } else {
          break;
        }
      }
      return currentNode[currentPosition[currentPosition.length-1]].value;
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Depth-First Search Visualization</h1>
            
            {/* New text display */}
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-lg">
                    <span className="font-semibold">Search Term:</span> {state.searchTerm}
                </p>
                {state.state[0] === "searching" && (
                    <p className="text-lg mt-2">
                        {<> <span className="font-semibold">Currently Examining:</span> {getCurrentlyHighlightedValue()}</>}
                    </p>
                )}
            </div>
            
            {/* Tree visualization with added padding */}
            <div className="mb-8 overflow-x-auto">
                <div className="inline-block min-w-full p-8">
                    {state.visualizationData && Array.isArray(state.visualizationData) && (
                        <div className="flex justify-center space-x-16">
                            {state.visualizationData.map((rootNode: any, index: number) => (
                                <TreeNode 
                                    key={index} 
                                    node={rootNode} 
                                    depth={0} 
                                    position={[index]}
                                    state={state}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleStartSearch}
                className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
                disabled={state.state[0] === "searching"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

//use compare to highlight found item + search focus?


// add animations
// add highlight for currently selected item
//add set searchTerm entry
// add "computer consciousness" area
//make searcher change color when it finds

