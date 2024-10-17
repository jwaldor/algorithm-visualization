"use client";

import { createRef, useMemo, useState, forwardRef, useEffect, RefObject, useRef, useCallback, useLayoutEffect, ReactNode } from "react";
import * as d3 from 'd3';







interface CircleProps {
    entry: number;
    array: number[];
    executing: boolean;
    setNumbers: React.Dispatch<React.SetStateAction<number[]>>;
    found: number | undefined;
}

const Circle: React.FC<CircleProps> = ({ entry, executing, array, setNumbers, found }) => {
    const isFound = found === entry;
    const baseClasses = "w-20 h-20 rounded-full grid place-items-center text-white font-bold shadow-md transition-all duration-300";
    const colorClasses = isFound
        ? "bg-purple-500 border-4 border-purple-700 hover:bg-purple-400"
        : "bg-blue-500 border-4 border-blue-700 hover:bg-blue-400";

    return (
        <div className={`${baseClasses} ${colorClasses}`}>
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
};

const PlusButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-20 h-20 rounded-full bg-green-500 border-4 border-green-700 flex items-center justify-center text-white font-bold text-3xl shadow-md hover:bg-green-400 transition-colors duration-300"
    >
        +
    </button>
);


type onUpdateFunction = (state: AlgorithmSnapshot) => Promise<void>




type AlgorithmSnapshot = 
  | {type:"pre_algorithm"}
  | { type: 'finding_min_unvisited'; data: {starting_node:string,distances:Record<string,number>,visited:Array<string>,wait_time:number} }
  | { type: 'pre_minimize_neighbors'; data:{starting_node:string, current_node:string, unvisited_neighbors:Array<string>, distances:Record<string,number>, wait_time:number} }
  | { type: 'minimize_neighbors_step'; data: {starting_node:string,current_node:string,neighbor:string,distances:Record<string,number>,newdist:number,edge_length:number,wait_time:number,unvisited_neighbors:Array<string>} }
  | { type: 'finished'; data: {starting_node:string,distances:Record<string,number>} }


async function djikstra(graph: Record<string, Record<string, number>>, starting_node: string, callback?: onUpdateFunction): Promise<Record<string, number>> {
  const nodes = Object.keys(graph);
  const distances: {[key: string]: number} = nodes.reduce((acc: {[key: string]: number}, node: string) => {
    acc[node] = Infinity;
    return acc;
  }, {});
  distances[starting_node] = 0;
  let current_node: string = "";
  const visited: Array<string> = [];
  while (visited.length < nodes.length) {

    //find node with smallest finite distance
    const distancesArray = Object.entries(distances).map(([key, value]) => ({
      [key]: value,
    }));
    if (callback){
      console.log("callback finding_min_unvisited")
      await callback({type:"finding_min_unvisited",data:{starting_node:starting_node,distances:distances,visited:visited,wait_time:1000}})
    }
    console.log(
      "distancesArray",
      distancesArray.filter((arr) => !visited.includes(Object.keys(arr)[0]))
    );
    let min = Infinity;
    distancesArray
      .filter((arr) => !visited.includes(Object.keys(arr)[0]))
      .forEach((elt, _) => {
        // console.log("elt", elt, a);
        // console.log(elt, Object.values(elt)[0]);
        if ((Object.values(elt)[0] as number) <= min) {
          min = Object.values(elt)[0] as number;
          current_node = Object.keys(elt)[0];
        }
      });
    // console.log("min", current_node, min);
    //update distances of unvisited neighbors
    const unvisited_neighbors = Object.keys(graph[current_node]).filter(
      (elt) => {
        console.log("elt", elt, visited);
        return !visited.includes(elt);
      }
    );
    if (callback){
      await callback({type:"pre_minimize_neighbors",data:{starting_node:starting_node,current_node:current_node,unvisited_neighbors:unvisited_neighbors,distances:distances,wait_time:1000}})
    }
    console.log("unvisited_neighbors", unvisited_neighbors);
    for (const neighbor of unvisited_neighbors){
      const newdist = graph[current_node][neighbor] + distances[current_node];
      console.log(
        "graphneighbor",
        current_node,
        neighbor,
        graph[current_node][neighbor],
        distances[current_node],
        newdist
      );
      if (callback){
        await callback({
          type:"minimize_neighbors_step",
          data:{
            starting_node:starting_node,
            current_node:current_node,
            neighbor:neighbor,
            distances:distances,
            newdist:newdist,
            edge_length:graph[current_node][neighbor],
            wait_time:1000,
            unvisited_neighbors:unvisited_neighbors
          }
        })
      }
      if (newdist < distances[neighbor]) {
        distances[neighbor] = newdist;
        console.log("updated", neighbor, newdist);
      }
      if (callback){
        await callback({
          type:"minimize_neighbors_step",
          data:{
            starting_node:starting_node,
            current_node:current_node,
            neighbor:neighbor,
            distances:distances,
            newdist:newdist,
            edge_length:graph[current_node][neighbor],
            wait_time:1000,
            unvisited_neighbors:unvisited_neighbors
          }
        })
      }
    }
    if (callback){
      await callback({type:"pre_minimize_neighbors",data:{starting_node:starting_node,current_node:current_node,unvisited_neighbors:unvisited_neighbors,distances:distances,wait_time:2500}})
    }
    visited.push(current_node);
  }
  if (callback){
    await callback({type:"finished",data:{starting_node:starting_node,distances:distances}})
  }
  return distances;
}


//visualization process:
//show distance for each node on graph?
//graph component takes a Record that displays what is on each graph node




interface Node extends d3.SimulationNodeDatum {
  id: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

interface GraphProps {
  graph: Record<string, Record<string, number>>;
  setGraph: React.Dispatch<React.SetStateAction<Record<string, Record<string, number>>>>;
  nodeColors: Record<string, string>;
  algorithmState: AlgorithmSnapshot;
  haveRun: boolean;
  setHaveRun: React.Dispatch<React.SetStateAction<boolean>>;
}

const Node: React.FC<{ 
  node: Node; 
  color: string; 
  onDragStart: (event: any, node: Node) => void; 
  onDragged: (event: any, node: Node) => void; 
  onDragEnd: (event: any, node: Node) => void;
  algorithmState: AlgorithmSnapshot;
  graph: Record<string, Record<string, number>>;
  setGraph: React.Dispatch<React.SetStateAction<Record<string, Record<string, number>>>>;
  haveRun: boolean;
  setHaveRun: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ node, color, onDragStart, onDragged, onDragEnd, algorithmState, graph, setGraph, haveRun, setHaveRun }) => {
  const [showMenu, setShowMenu] = useState(false);

  // You can use algorithmState here to modify the node's appearance
  let nodeText = node.id;
  let nodeColor = color;
  let nodeBold = false;
  switch (algorithmState.type) {
    case "pre_algorithm":
      break;
    default:
      if (algorithmState.data.distances[node.id] !== Infinity){
      nodeText = `${node.id}: ${algorithmState.data.distances[node.id]}`;
      }
      else{
        nodeText =  `${node.id}: ∞`;
      }
      if (node.id === algorithmState.data.starting_node) {
        nodeBold = true;
      }
      
      switch (algorithmState.type) {
        case 'finding_min_unvisited':
          if (!algorithmState.data.visited.includes(node.id)) {
            nodeColor = "red";
          }
          break;
        case 'pre_minimize_neighbors':
          if (algorithmState.data.unvisited_neighbors.includes(node.id)) {
            nodeColor = "blue";
          } else if (algorithmState.data.current_node === node.id) {
            nodeColor = "yellow";
          }
          break;
        case 'minimize_neighbors_step':
          if (algorithmState.data.unvisited_neighbors.includes(node.id) && algorithmState.data.neighbor !== node.id) {
            nodeColor = "blue";
          } else if (algorithmState.data.current_node === node.id) {
            nodeColor = "yellow";
          } else if (algorithmState.data.neighbor === node.id) {
            nodeColor = "green";
          }
          break;
        default:
          nodeColor = "white";
      }
  }

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (algorithmState.type === "pre_algorithm" || algorithmState.type === "finished"){
      setShowMenu(!showMenu);
    }
  };

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onMouseDown={(e) => onDragStart(e, node)}
      onMouseMove={(e) => onDragged(e, node)}
      onMouseUp={(e) => onDragEnd(e, node)}
      onMouseLeave={(e) => onDragEnd(e, node)}
      
    >
      <circle r="35" fill={nodeColor} stroke="black" strokeWidth="3" onClick={handleClick}/>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={nodeBold ? "brown" : "black"}
        fontSize="20px"
        fontWeight="normal"
      >
        {nodeText}
      </text>
      {(algorithmState.type === "pre_algorithm" || algorithmState.type === "finished") && showMenu && (
        <g transform="translate(40, -30)">
          {(() => {
            const neighbors = Object.entries(graph[node.id] || {});
            const boxHeight = 30 + neighbors.length * 30; // 30 for the header, 30 for each neighbor
            return (
              <>
                <rect x="0" y="0" width="100" height={boxHeight} fill="white" stroke="black" />
                <text x="10" y="20" fontSize="14">Neighbors:</text>
                {neighbors.map(([neighbor, edgeLength], index) => (
                  <g key={neighbor} transform={`translate(20, ${50 + index * 30})`}>
                    <text fontSize="12">{neighbor}</text>
                    <foreignObject x="30" y="-15" width="40" height="20">
                      <input
                        type="number"
                        style={{ width: '100%', height: '100%', fontSize: '12px' }}
                        value={edgeLength}
                        onChange={(e) => {
                          const newGraph = {...graph};
                          newGraph[node.id][neighbor] = Number(e.target.value);
                          setGraph(newGraph);
                          setHaveRun(false);
                        }}
                      />
                    </foreignObject>
                    <foreignObject x="50" y="-15" width="20" height="20">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'red',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          const newGraph = {...graph};
                          delete newGraph[node.id][neighbor];
                          console.log("newGraph", newGraph)
                          setGraph(newGraph);
                          setHaveRun(false);
                        }}
                      >
                        <span style={{ color: 'white', fontSize: '14px' }}>X</span>
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </>
            );
          })()}
        </g>
      )}
    </g>
  );
};

const Graph: React.FC<GraphProps> = ({ graph, setGraph, nodeColors, algorithmState, haveRun, setHaveRun }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const width = 800;
  const height = 600;

  useLayoutEffect(() => {
    console.log("useLayoutEffect",graph)
    const nodesData: Node[] = Object.keys(graph).map(id => ({ id }));
    const linksData: Link[] = [];

    Object.entries(graph).forEach(([source, targets]) => {
      Object.entries(targets).forEach(([target, value]) => {
        linksData.push({ source, target, value });
      });
    });

    setNodes(nodesData);
    setLinks(linksData);

    if (!haveRun && false){
      console.log("setting up simulation")
      setHaveRun(true);

    simulationRef.current = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData).id((d: any) => d.id).distance(200))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulationRef.current.on('tick', () => {
      setNodes([...nodesData]);
      setLinks([...linksData]);
    });
  } else {
    console.log("restarting simulation")
    simulationRef.current = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData).id((d: any) => d.id).distance(200))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

      
      simulationRef.current.stop();
      simulationRef.current.tick(3000);
  }

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [graph]);

  const dragStart = useCallback((event: any, d: any) => {
    if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }, []);

  const dragged = useCallback((event: any, d: any) => {
    d.fx = event.x;
    d.fy = event.y;
  }, []);

  const dragEnd = useCallback((event: any, d: any) => {
    if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }, []);

  const handleSvgClick = () => {
    // Close all node menus when clicking on the svg
    setNodes(nodes.map(node => ({ ...node, showMenu: false })));
  };
  console.log("links",links)

  return (
    <svg ref={svgRef} width={width} height={height} onClick={handleSvgClick}>
        {(() => {
          return links.map((link, index) => {

            return (
            <g key={index}>
              <line
                x1={(link.source as Node).x}
                y1={(link.source as Node).y}
                x2={(link.target as Node).x}
                y2={(link.target as Node).y}
                stroke="#999"
                strokeOpacity={0.6}
                strokeWidth={2}
              />
              <text
                x={(((link.source as Node).x || 0) + ((link.target as Node).x || 0)) / 2}
                y={(((link.source as Node).y || 0) + ((link.target as Node).y || 0)) / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#666"
                fontSize="12px"
                fontWeight="bold"
                dy="-5"
              >
                {link.value}
                </text>
            </g>
          )});
        })()}
        {nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            color={nodeColors[node.id] || 'white'}
            onDragStart={dragStart}
            onDragged={dragged}
            onDragEnd={dragEnd}
            algorithmState={algorithmState}
            graph={graph}
            setGraph={setGraph}
            haveRun={haveRun}
            setHaveRun={setHaveRun}
          />
        ))}
    </svg>
  );
};

export default function Page() {
  // const svgRef = useRef<SVGSVGElement>(null);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmSnapshot>({type:"pre_algorithm"});
  const [algorithmStateHistory, setAlgorithmStateHistory] = useState<Array<Array<AlgorithmSnapshot>>>([[]]);
  const [nodeColors, setNodeColors] = useState<Record<string, string>>({});
  const [complexWeightedGraph,setComplexWeightedGraph] = useState<Record<string,Record<string,number>>>({
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 },
  });
  //set node colors based on algorithm state
  useEffect(() => {
    if (algorithmState.type === "finding_min_unvisited"){
      // setNodeColors(algorithmState.data.distances)
    }
  },[algorithmState])



  const hasRunAlgorithm = useRef(false);

  useEffect(() => {
    if (!hasRunAlgorithm.current) {
      djikstra(complexWeightedGraph, "A", update)
        .then(() => {
          console.log("djikstra finished");
        });
      hasRunAlgorithm.current = true;
    }
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setNodeColors(prevColors => 
  //       prevColors === nodeColors1 ? nodeColors2 : nodeColors1
  //     );
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
  


  async function update(payload: AlgorithmSnapshot) {
    setAlgorithmState(payload);
    setAlgorithmStateHistory(prevHistory => {
      const newHistory = [...prevHistory];
      if (payload.type === "finding_min_unvisited" && newHistory[newHistory.length - 1].length > 0) {
        newHistory.push([]);
      }
      newHistory[newHistory.length - 1].push(payload);
      return newHistory;
    });
    //wait for payload.wait_time
    if (payload.type !== "pre_algorithm" && payload.type !== "finished" && payload.data && "wait_time" in payload.data){
      await new Promise(resolve => setTimeout(resolve, payload.data.wait_time));
    }
  }
  console.log("prevHistory",algorithmStateHistory)

  function generateLog(history: Array<Array<AlgorithmSnapshot>>): ReactNode[] {
    return history.map((stateGroup, groupIndex) => (
      <div key={groupIndex} className="mb-4 border-b pb-2">
        <h3 className="font-bold">
          Iteration {groupIndex + 1}
          {stateGroup.find(state => state.type === "pre_minimize_neighbors") && 
           ` - Minimum node: ${stateGroup.find(state => state.type === "pre_minimize_neighbors")?.data.current_node}`}
        </h3>
        {[...stateGroup].reverse().map((state, index) => {
          let stateString: JSX.Element;
          switch (state.type) {
            case "pre_algorithm":
              stateString = <span>Algorithm is about to start</span>;
              break;
            case "finding_min_unvisited":
              stateString = (
                <span>
                  Finding minimum unvisited node. Starting node: <span style={{backgroundColor: 'lightgreen'}}>{state.data.starting_node}</span>. 
                  Visited nodes: {state.data.visited.map(node => <span key={node} style={{backgroundColor: 'lightblue'}}>{node} </span>)}
                </span>
              );
              break;
            case "pre_minimize_neighbors":
              stateString = (
                <span>
                  Preparing to check neighbors of node <span style={{backgroundColor: 'yellow'}}>{state.data.current_node}</span>. 
                  Unvisited neighbors: {state.data.unvisited_neighbors.map(node => <span key={node} style={{backgroundColor: 'lightsalmon'}}>{node} </span>)}
                </span>
              );
              break;
            case "minimize_neighbors_step":
              stateString = (
                <span>
                  Checking neighbor <span style={{backgroundColor: 'lightsalmon'}}>{state.data.neighbor}</span> of node <span style={{backgroundColor: 'yellow'}}>{state.data.current_node}</span>. 
                  New distance: {state.data.newdist}, Edge length: {state.data.edge_length}
                </span>
              );
              break;
            case "finished":
              stateString = (
                <span>
                  Algorithm finished. Final distances from <span style={{backgroundColor: 'lightgreen'}}>{state.data.starting_node}</span>: {' '}
                  {Object.entries(state.data.distances).map(([node, dist]) => (
                    <span key={node} style={{backgroundColor: 'lightblue'}}>{node}:{dist} </span>
                  ))}
                </span>
              );
              break;
            default:
              stateString = <span>Unknown state</span>;
          }
          return <div key={`${groupIndex}-${index}`}>{stateString}</div>;
        })}
      </div>
    )).reverse();
  }

  const [haveRun, setHaveRun] = useState(false);

  return (
    <div className="p-8">
      {/* <svg ref={svgRef}></svg> */}
      <Graph 
        graph={complexWeightedGraph} 
        setGraph={setComplexWeightedGraph}
        nodeColors={nodeColors} 
        algorithmState={algorithmState} 
        haveRun={haveRun}
        setHaveRun={setHaveRun}
      />
      <div>
        <div className="text-lg font-semibold">Algorithm Log</div>
        <div>{generateLog(algorithmStateHistory)}</div>
      </div>
    </div>
    
  );
}

//add button to let you go to next step in algorithm?
//have it display which step is happening in text
//give starting node text a different color so you can still change its background appropriately (to yellow when it's the current node)
//realistic edge lengths
//allow adding new nodes










