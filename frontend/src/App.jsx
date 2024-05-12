import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import CoinPage from './Pages/CoinPage'

function App() {

  return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App
