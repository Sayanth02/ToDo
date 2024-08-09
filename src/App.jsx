
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from './TodoList'
import AddTask from './AddTask'
import { Route,Routes } from 'react-router-dom'
import UpdateTask from './UpdateTask'





function App() {

 
 
  

  return (
    <div className='bg-slate-700'>
     <Header/>
     <Routes>
     
     <Route path='/' element={<TodoList/>}/>
     <Route path='/add-task' element={<AddTask/>}/>
     <Route path='/update-task/:id' element={<UpdateTask/>}/>
     </Routes>
     
     <Footer/>
    </div>
  )
}

export default App
