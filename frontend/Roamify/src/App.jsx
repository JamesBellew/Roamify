import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from './pages/SideBar'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard';
import { CookiesProvider } from "react-cookie";

function App() {


  return (
    <>
    {/* //main router */}
     <main class="min-h-screen dark:bg-background-main">
  <BrowserRouter>
  <CookiesProvider>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
      </CookiesProvider>
    </BrowserRouter>
</main>

    </>
  )
}

export default App
