import React from 'react'
import './App.scss'
import "./reducers"
import Cart from './Cart'
import DeliveryAndPay from "./components/DeliveryAndPay"

function App() {
  return (
    <div className="App">
      <Cart />
      <DeliveryAndPay/>
    </div>
  )
}

export default App
