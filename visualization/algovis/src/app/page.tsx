"use client";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
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
              <polygon points="10,25 10,35 5,30" fill="black" />
              <text x="10" y="20" fontSize="10" textAnchor="middle">Start</text>
              <polygon points="190,25 190,35 195,30" fill="black" />
              <text x="190" y="20" fontSize="10" textAnchor="middle">End</text>
              <line x1="100" y1="10" x2="100" y2="50" stroke="black" strokeWidth="1" strokeDasharray="4" />
            </svg>
          </div>
        </div>


      </div>
    </div >
  );
}
