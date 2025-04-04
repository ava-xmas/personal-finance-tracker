import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TransactionForm from './view/transactions/TransactionForm'
import { AuthView } from './view/auth/Login'
import Button from './view/Button'

function App() {
  return (
    <>
      <Button />
      <AuthView />
      <TransactionForm />
    </>
  )
}

export default App
