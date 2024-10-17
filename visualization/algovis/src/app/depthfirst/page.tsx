"use client";

import React, { useState, useEffect } from "react";


interface TreeNode {
  value: number;
  children: TreeNode[];
}




type onUpdateFunction = (state: { position: Array<number> }) => void

function depthFirstSearch(tree: TreeNode, term: number, position: Array<number> = [], callback?: onUpdateFunction): Array<number> | undefined {
  if (callback) {
    callback({ position: position })
    console.log("position", position, tree,)
  }
  if (tree.value === term) {
    return position;
  }
  else {
    for (let i = 0; i < tree.children.length; i++) {

      const d: Array<number> | undefined = depthFirstSearch(tree.children[i], term, position.concat(i), callback);
      if (d) {
        return d;
      }
    }
  }
}

// console.log("depthFirstSearch",depthFirstSearch([{value:1,children:[{value:2,children:[{value:3,children:[]}]}]}],3,[],(searchState) => {console.log("searchState",searchState)}))

const TreeNode: React.FC<{ node: TreeNode, depth: number, position: Array<number>, state: StateType }> = ({ node, depth, position, state }) => {
  let isCurrentlySearched = false;
  let isFound = false;

  if (state[0] === "searching") {
    const currentPosition = state[1].positions[state[1].position];
    console.log("currentPosition", currentPosition, "position", position)
    isCurrentlySearched = JSON.stringify(position) === JSON.stringify(currentPosition);
  } else if (state[0] === "found") {
    isFound = JSON.stringify(position) === JSON.stringify(state[1].position);
  }

  const nodeColor = isFound ? 'bg-purple-500' : (isCurrentlySearched ? 'bg-yellow-500' : 'bg-blue-500');
  const borderColor = isFound ? 'border-purple-700' : (isCurrentlySearched ? 'border-yellow-700' : 'border-blue-700');
  console.log("rendering tree", node)
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
              {node.children.map((child: TreeNode, index: number) => (
                <TreeNode
                  key={index}
                  node={child}
                  depth={depth + 1}
                  position={position.concat(index)}
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

type StateType = ["pre-search"] | ["searching", { position: number, positions: Array<Array<number>>, foundItem: number[] | undefined }] | ["found", { position: Array<number> }] | ["not-found"]

export default function Page() {

  const [state, setState] = useState<{ visualizationData: TreeNode, searchTerm: number, state: StateType }>({ visualizationData: { value: 8, children: [{ value: 3, children: [] }] }, searchTerm: 6, state: ["pre-search"] })

  useEffect(() => {
    const tree =
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
    }

    depthFirstSearch(tree, state.searchTerm, [], (searchState) => {
      setState(prevState => ({ ...prevState, position: searchState.position }))
      console.log("positioncallback", searchState.position)
    })
    setState({ ...state, visualizationData: tree })
  }, [])

  function handleStartSearch() {
    if (state.state[0] !== "searching") {
      setState({ ...state, state: ["searching", { position: 0, positions: [], foundItem: undefined }] })
      const result = depthFirstSearch(state.visualizationData, state.searchTerm, [], (searchState) => {
        setState(prevState => ({ ...prevState, state: ["searching", { position: 0, positions: (prevState.state[1] as { position: number, positions: Array<Array<number>>, foundItem: number[] | undefined }).positions.concat([searchState.position]), foundItem: (prevState.state[1] as { position: number, positions: Array<Array<number>>, foundItem: number[] | undefined }).foundItem }] }))
        console.log("positioncallback", searchState.position)
      })
      setState(prevState => ({ ...prevState, state: ["searching", { position: 0, positions: (prevState.state[1] as { position: number, positions: Array<Array<number>>, foundItem: number | undefined }).positions, foundItem: result }] }))

      console.log("result", result)
      // Set up an interval to update the position every second
      const intervalId = setInterval(() => {
        setState(prevState => {
          if (prevState.state[0] === "searching") {
            const currentPositions = (prevState.state[1] as { position: number, positions: Array<Array<number>> }).positions;
            const newPosition = Math.min((prevState.state[1] as { position: number }).position + 1, currentPositions.length - 1);

            console.log(`Updating position: ${newPosition}`);

            // Check if we've reached the end of the positions array
            if (newPosition === currentPositions.length - 1) {
              console.log("Search complete, clearing interval");
              clearInterval(intervalId);
              setTimeout(() => {
                if (prevState.state[1] && 'foundItem' in prevState.state[1] && prevState.state[1].foundItem) {
                  setState({
                    ...prevState,
                    state: ["found", {
                      position: currentPositions[currentPositions.length - 1],
                    }]
                  });
                } else {
                  setState({
                    ...prevState,
                    state: ["not-found"]
                  });
                }
              }, 1000);
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

  console.log("state", state)
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
    let currentNode: TreeNode = state.visualizationData;
    for (const index of currentPosition.slice(0, currentPosition.length)) {
      currentNode = currentNode.children[index];
      console.log("currentNode loop", currentNode.value)
      // if (currentNode.children) {
      //   currentNode = currentNode.children[index];
      // } else {
      //   break;
      // }
    }
    console.log("currentNode value", currentNode.value)
    return currentNode.value;
  };
  console.log("tree", state.visualizationData)
  // useEffect(() => {
  //   if (state.state[0] === "searching") {
  //     console.log("getCurrentlyHighlightedValue", getCurrentlyHighlightedValue())
  //   }
  // }, [state, getCurrentlyHighlightedValue])
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Depth-First Search Visualization</h1>

      {/* New text display */}
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg">
          <span className="font-semibold">Search Term:</span>{' '}
          {state.state[0] === "searching" ? (
            state.searchTerm
          ) : (
            <input
              type="number"
              value={state.searchTerm}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (!isNaN(newValue)) {
                  setState(prevState => ({ ...prevState, searchTerm: newValue }));
                }
              }}
              className="w-16 px-2 py-1 border rounded"
            />
          )}
        </p>
        {state.state[0] === "searching" && (
          <p className="text-lg mt-2">
            {<> <span className="font-semibold">Currently Examining:</span> {getCurrentlyHighlightedValue()}</>}
          </p>
        )}
        {state.state[0] === "found" && (
          <p className="text-lg mt-2">
            {<> <span className="font-semibold">Found!</span></>}
          </p>
        )}
        {state.state[0] === "not-found" && (
          <p className="text-lg mt-2">
            {<> <span className="font-semibold">Result:</span> Item not found</>}
          </p>
        )}
      </div>
      {/* Tree visualization with added padding */}
      <div className="mb-8 overflow-x-auto">
        <div className="inline-block min-w-full p-8">
          {state.visualizationData && (
            <div className="flex justify-center space-x-16">
              {/* {state.visualizationData.map((rootNode: TreeNode, index: number) => {
                console.log("rootNode", rootNode)
                return <TreeNode
                  key={index}
                  node={rootNode}
                  depth={0}
                  position={[index]}
                  state={state.state}
                />
              })} */}
              <TreeNode
                node={state.visualizationData}
                depth={0}
                position={[]}
                state={state.state}
              />
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

