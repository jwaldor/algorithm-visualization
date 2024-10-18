export type CallbackArgs = {
  compare: number;
  leading: number;
  array: Array<number>;
  index: number;
  target: number;
  right: number;
};
type Callback = (props: CallbackArgs) => void;

type FrameBubble = {
  value: number | undefined;
  type: "regular" | "focus" | "found" | undefined;
};

type Frame = Array<FrameBubble>;

type Frames = Array<Frame>;

enum FrameBubbleColor {
  REGULAR = "bg-blue-400 border-blue-600",
  FOCUS = "bg-yellow-400 border-yellow-600",
  FOUND = "bg-green-400 border-green-600",
}

export function binarySearch(
  arr: number[],
  target: number,
  callback?: Callback
): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (callback) {
      callback({
        compare: arr[mid],
        leading: left,
        array: arr,
        index: mid,
        target: target,
        right: right,
      });
    }
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

export function makeFrames(searchSteps: Array<CallbackArgs>) {
  const frames: Frames = [];
  for (let i = 0; i < searchSteps.length; i++) {
    const step = searchSteps[i];
    const frame: Frame = Array(step.leading).fill({
      value: undefined,
      type: undefined,
    });
    for (let j = step.leading; j <= step.right; j++) {
      if (step.array[j] === step.target && j === step.index) {
        frame.push({ value: step.array[j], type: "found" });
      } else if (j === step.index) {
        frame.push({ value: step.array[j], type: "focus" });
      } else {
        frame.push({ value: step.array[j], type: "regular" });
      }
    }
    frames.push(frame);
  }
  return frames;
}
