import { useEffect, useState } from "react";



type onUpdateFunction = (state: {i:number}) => Promise<void>

export async function linearSearch(array:Array<number>, term: number, onUpdate?: onUpdateFunction) {
    for (let i = 0; i < array.length; i++) {
        if (onUpdate) await onUpdate({i});
        if (array[i] === term) {
            return i;
      }
    }
    return undefined;
  }

const history: number[] = []
  // looping through history.

export default function ExampleLoop(){
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const  currentFrame = history[currentIndex]

    useEffect(()=>{
        if (currentIndex < history.length - 1){
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
        }
    },[currentIndex])

    // put a setTimeout in an Interval.
    // call the 

    return <div>{JSON.stringify(currentFrame)}</div>
}