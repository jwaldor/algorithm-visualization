"use client";

import { createRef, useMemo, useState, forwardRef, useEffect, RefObject, useRef, useCallback } from "react";
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




function djikstra(graph: Record<string, Record<string, number>>, starting_node: string): Record<string, number> {
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
    console.log("unvisited_neighbors", unvisited_neighbors);
    unvisited_neighbors.forEach((neighbor) => {
      const newdist = graph[current_node][neighbor] + distances[current_node];
      console.log(
        "graphneighbor",
        current_node,
        neighbor,
        graph[current_node][neighbor],
        distances[current_node],
        newdist
      );

      if (newdist < distances[neighbor]) {
        distances[neighbor] = newdist;
        console.log("updated", neighbor, newdist);
      }
    });
    visited.push(current_node);
  }
  return distances;
}


//visualization process:
//show distance for each node on graph?
//graph component takes a Record that displays what is on each graph node



type AlgorithmSnapshot = 
  | {type:"pre_algorithm"}
  | { type: 'finding_min_unvisited'; data: {distances:Record<string,number>,visited:Array<string>,wait_time:number} }
  | { type: 'pre_minimize_neighbors'; data:{current_node:string,unvisited_neighbors:Array<string>} }
  | { type: 'minimize_neighbors_step'; data: {current_node:string,neighbor:string,distances:Record<string,number>,newdist:number,edge_length:number} }
  | { type: 'finished'; data: {distances:Record<string,number>} }

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
}

const Graph: React.FC<GraphProps> = ({ graph }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  const svgRef = useRef<SVGSVGElement>(null);
  const width = 800;
  const height = 600;

  useEffect(() => {
    const nodesData: Node[] = Object.keys(graph).map(id => ({ id }));
    const linksData: Link[] = [];

    Object.entries(graph).forEach(([source, targets]) => {
      Object.entries(targets).forEach(([target, value]) => {
        linksData.push({ source, target, value });
      });
    });

    setNodes(nodesData);
    setLinks(linksData);

    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulation.on('tick', () => {
      setNodes([...nodesData]);
      setLinks([...linksData]);
    });

    return () => {
      simulation.stop();
    };
  }, [graph]);

  const dragStart = useCallback((event: any, d: any) => {
    if (!event.active) d3.forceSimulation(nodes).alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }, [nodes]);

  const dragged = useCallback((event: any, d: any) => {
    d.fx = event.x;
    d.fy = event.y;
  }, []);

  const dragEnd = useCallback((event: any, d: any) => {
    if (!event.active) d3.forceSimulation(nodes).alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }, [nodes]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      {links.map((link, index) => (
        <line
          key={index}
          x1={(link.source as Node).x}
          y1={(link.source as Node).y}
          x2={(link.target as Node).x}
          y2={(link.target as Node).y}
          stroke="#999"
          strokeOpacity={0.6}
          strokeWidth={2}
        />
      ))}
      {nodes.map((node) => (
        <g
          key={node.id}
          transform={`translate(${node.x},${node.y})`}
          onMouseDown={(e) => dragStart(e, node)}
          onMouseMove={(e) => dragged(e, node)}
          onMouseUp={(e) => dragEnd(e, node)}
          onMouseLeave={(e) => dragEnd(e, node)}
        >

          <circle
            r="15"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="black"
            fontSize="16px"
            fontWeight="bold"
          >
            {node.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default function Page() {
  // const svgRef = useRef<SVGSVGElement>(null);
  const [algorithmState, setAlgorithmState] = useState<AlgorithmSnapshot>({type:"pre_algorithm"});
  const complexWeightedGraph = {
    A: { B: 4, C: 2 },
    B: { A: 4, C: 1, D: 5 },
    C: { A: 2, B: 1, D: 8, E: 10 },
    D: { B: 5, C: 8, E: 2, F: 6 },
    E: { C: 10, D: 2, F: 3 },
    F: { D: 6, E: 3 },
  };


  function update(payload: AlgorithmSnapshot) {
    setAlgorithmState(payload);
  }

  return (
    <div className="p-8">
      {/* <svg ref={svgRef}></svg> */}
      <Graph graph={complexWeightedGraph} />
    </div>
  );
}
