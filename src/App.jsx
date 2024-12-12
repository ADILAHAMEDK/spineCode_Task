import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TaskList from './components/TaskList'
import Home from './pages/Home'
import Header from './components/Header'
import Api from './components/Api'

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/tasklist' element={<TaskList/>} />
    <Route path='/api' element={<Api/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App