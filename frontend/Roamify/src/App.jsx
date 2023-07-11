import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from './pages/SideBar'
import HomePage from './pages/HomePage'
import Dashbaord from './pages/Dashboard';
import { CookiesProvider } from "react-cookie";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <main class="min-h-screen dark:bg-background-main">
  <BrowserRouter>
  <CookiesProvider>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/dashboard" element={<Dashbaord />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      </CookiesProvider>
    </BrowserRouter>
</main>
    </>
  )
}

export default App
