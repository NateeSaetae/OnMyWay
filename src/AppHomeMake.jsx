import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function AppHomeMake() {
  const [count, setCount] = useState(0)
  const vite_react_Class = "text-7xl font-bold bg-gradient-to-r from-[#A378B5]  to-cyan-400 w-150 bg-clip-text text-transparent"

  return (
    <div>
      <div className="text-center bg-gradient-to-r from-blue-100 via-white to-cyan-100 w-screen min-h-screen"> {/*from-[#A378B5] via-white to-cyan-200*/}
        <div className="justify-center flex pt-15 pb-10">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo w-50 h-30 hover:-translate-y-4 duration-200" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react w-50 h-30 hover:-translate-y-4 duration-200" alt="React logo" />
          </a>
        </div>  
        <div className="flex justify-center">
          <h1 className={vite_react_Class}>Vite + React</h1>
        </div>
        <div className="card">
          <p className="text-9xl py-4 font-semibold bg-gradient-to-r from-red-200 to-red-600 text-transparent bg-clip-text">
            {count}
          </p>
          <button onClick={() => setCount((count) => count + 10000)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 py-2 px-3 rounded-full my-3 font-semibold text-2xl text-white shadow-lg active:to-cyan-600 active:shadow-xl transition-all duration-100 transform active:-translate-y-1 hover:-translate-1.5">
            +10000
          </button>
          <button onClick={() => setCount(() => 0)}
            className="bg-gradient-to-r from-red-700 to-red-400 py-2 px-4 mx-4 text-2xl font-semibold rounded-full text-white shadow-lg hover:-translate-1.5 transition-all duration-100 transform active:to-red-300 active:-translate-y-1 active:shadow-xl">  
            Reset
          </button>
          <p className="text-2xl pt-5">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs text-2xl">
          active on the Vite and React logos to learn more
        </p>

      </div>
    </div>


    
  )
}

export default AppHomeMake;