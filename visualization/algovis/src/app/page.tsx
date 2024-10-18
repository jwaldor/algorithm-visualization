"use client";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="pl-1 mb-6">Algorithms in Motion</div>
      <div className="flex flex-col gap-4 mt-2">
        <div
          onClick={() => window.location.href = '/linear'}
          className="p-3 border border-gray-300 rounded-md w-[80%] sm:w-[50%] h-28 cursor-pointer"
        >
          <div className="mb-2">Linear Search</div>
          <div className="flex justify-center h-full">
            <svg width="250" height="60" viewBox="0 0 200 60">
              <line x1="10" y1="30" x2="190" y2="30" stroke="black" strokeWidth="2" />
              <circle cx="40" cy="30" r="5" fill="red" />
              <text x="40" y="55" fontSize="10" textAnchor="middle">Current</text>
              <circle cx="10" cy="30" r="3" fill="black" />
              <text x="10" y="20" fontSize="10" textAnchor="middle">Start</text>
              <polygon points="190,25 190,35 195,30" fill="black" />
              <text x="190" y="20" fontSize="10" textAnchor="middle">End</text>
              <line x1="40" y1="10" x2="40" y2="50" stroke="black" strokeWidth="1" strokeDasharray="4" />
              <text x="50" y="20" fontSize="10" textAnchor="middle">→</text>
            </svg>
          </div>
        </div>
        <div
          onClick={() => window.location.href = '/binarySearch'}
          className="p-3 border border-gray-300 rounded-md w-[80%] sm:w-[50%] h-28 cursor-pointer"
        >
          <div className="mb-2 mt-">Binary Search</div>
          <div className="flex justify-center h-full">
            <svg width="250" height="60" viewBox="0 0 200 60">
              <line x1="10" y1="30" x2="190" y2="30" stroke="black" strokeWidth="2" />
              <circle cx="100" cy="30" r="5" fill="red" />
              <text x="100" y="55" fontSize="10" textAnchor="middle">Mid</text>
              <circle cx="10" cy="30" r="3" fill="black" />
              <text x="10" y="20" fontSize="10" textAnchor="middle">Start</text>
              <circle cx="190" cy="30" r="3" fill="black" />
              <text x="190" y="20" fontSize="10" textAnchor="middle">End</text>
              <line x1="100" y1="10" x2="100" y2="50" stroke="black" strokeWidth="1" strokeDasharray="4" />
            </svg>
          </div>
        </div>
        <div
          onClick={() => window.location.href = '/depthfirst'}
          className="p-3 border border-gray-300 rounded-md w-[80%] sm:w-[50%] h-28 cursor-pointer"
        >
          <div className="mb-1">Depth First Search</div>
          <div className="flex justify-center h-full">
            <svg width="250" height="70" viewBox="0 0 200 70">
              <line x1="100" y1="20" x2="70" y2="40" stroke="black" strokeWidth="2" />
              <line x1="100" y1="20" x2="130" y2="40" stroke="black" strokeWidth="2" />
              <line x1="70" y1="40" x2="55" y2="60" stroke="black" strokeWidth="2" />
              <line x1="70" y1="40" x2="85" y2="60" stroke="black" strokeWidth="2" />
              <line x1="130" y1="40" x2="115" y2="60" stroke="black" strokeWidth="2" />
              <line x1="130" y1="40" x2="145" y2="60" stroke="black" strokeWidth="2" />
              <circle cx="100" cy="20" r="5" fill="red" />
              <circle cx="70" cy="40" r="5" fill="black" />
              <circle cx="130" cy="40" r="5" fill="black" />
              <circle cx="55" cy="60" r="5" fill="black" />
              <circle cx="85" cy="60" r="5" fill="black" />
              <circle cx="115" cy="60" r="5" fill="black" />
              <circle cx="145" cy="60" r="5" fill="black" />
              <text x="100" y="10" fontSize="10" textAnchor="middle">Start</text>
            </svg>
          </div>
        </div>
        <div
          onClick={() => window.location.href = '/dijkstra'}
          className="p-3 border border-gray-300 rounded-md w-[80%] sm:w-[50%] h-28 cursor-pointer"
        >
          <div className="mb-1">Dijkstra&apos;s Algorithm</div>
          <div className="flex justify-center h-full">
            <svg width="250" height="70" viewBox="0 0 200 70">
              <line x1="20" y1="20" x2="100" y2="20" stroke="black" strokeWidth="1" />
              <line x1="20" y1="20" x2="60" y2="50" stroke="black" strokeWidth="1" />
              <line x1="100" y1="20" x2="60" y2="50" stroke="black" strokeWidth="1" />
              <line x1="100" y1="20" x2="160" y2="20" stroke="black" strokeWidth="1" />
              <line x1="160" y1="20" x2="160" y2="50" stroke="black" strokeWidth="1" />
              <line x1="60" y1="50" x2="160" y2="50" stroke="black" strokeWidth="1" />
              <line x1="20" y1="20" x2="160" y2="50" stroke="black" strokeWidth="1" />
              <circle cx="20" cy="20" r="10" fill="#4CAF50" stroke="black" strokeWidth="1" />
              <circle cx="100" cy="20" r="10" fill="#2196F3" stroke="black" strokeWidth="1" />
              <circle cx="160" cy="20" r="10" fill="#FFC107" stroke="black" strokeWidth="1" />
              <circle cx="60" cy="50" r="10" fill="#9C27B0" stroke="black" strokeWidth="1" />
              <circle cx="160" cy="50" r="10" fill="#FF5722" stroke="black" strokeWidth="1" />
              <text x="20" y="24" fontSize="10" textAnchor="middle" fill="white">2</text>
              <text x="100" y="24" fontSize="10" textAnchor="middle" fill="white">5</text>
              <text x="160" y="24" fontSize="10" textAnchor="middle" fill="white">3</text>
              <text x="60" y="54" fontSize="10" textAnchor="middle" fill="white">1</text>
              <text x="160" y="54" fontSize="10" textAnchor="middle" fill="white">4</text>
              <text x="60" y="15" fontSize="8" textAnchor="middle">4</text>
              <text x="130" y="15" fontSize="8" textAnchor="middle">2</text>
              <text x="38" y="42" fontSize="8" textAnchor="middle">3</text>
              <text x="80" y="42" fontSize="8" textAnchor="middle">1</text>
              <text x="165" y="37" fontSize="8" textAnchor="middle">5</text>
              <text x="110" y="57" fontSize="8" textAnchor="middle">6</text>
              <text x="90" y="42" fontSize="8" textAnchor="middle">7</text>
            </svg>
          </div>
        </div>



      </div>
    </div >
  );
}
