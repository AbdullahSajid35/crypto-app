import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import FirstPage from './components/FirstPage'
import SecondPage from './components/SecondPage'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    createRoutesFromElements(
       <Route path='/'  >
        <Route path='first' element={<FirstPage/>} />
        <Route path='second' element={<SecondPage/>} />
       </Route>
    )
  )
  return (
    <RouterProvider router={router}/>
  )
}

export default App
