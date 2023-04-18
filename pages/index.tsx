import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState<any[]>([])

  const submitPrompt = async () => {
      
    const data = {
      prompt: prompt,
      num_samples: 1,
      num_top_matches: 1,
      duration: 4
    }
    const JSONdata = JSON.stringify(data)

    const body = JSON.stringify({
      url: "http://d-app-clgjbq5mt003o2y2ngkxhwkge-947411825.us-east-1.elb.amazonaws.com/predict",
      method: "POST",
      body: JSONdata,
    });
    // const endpoint = 'http://d-app-clgjbq5mt003o2y2ngkxhwkge-947411825.us-east-1.elb.amazonaws.com/predict'
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSONdata,
    // }
    const response = await fetch("/api/predict", {
      method: "POST",
      body,
    });
    const result = await response.json()
    console.log(result)

    setContent(result)
  } 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
          
        <label htmlFor="prompt">Generate prompt:</label>
        <div/>
        <input type='text' id="prompt" name="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
        <div/>
        <button onClick={submitPrompt}>Submit</button>
        {content.map((cont) => {
          return(
            <div key={cont.key}>
            {cont.key} {cont.url}
          </div>
          )
        })}
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  )
}
