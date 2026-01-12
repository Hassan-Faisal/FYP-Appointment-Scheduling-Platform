import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Appointment Scheduler
        </h1>
        <p className="text-lg mb-6">
          Tailwind + Custom CSS is working! 🎉
        </p>
        <button className="rounded-lg px-6 py-3 text-base font-medium bg-gray-800 hover:border-blue-500 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
