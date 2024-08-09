import React, { useEffect, useState } from 'react'
import TodoCard from './components/TodoCard'
import { PlusCircle, UserPlus } from 'react-feather'
import { Link } from 'react-router-dom'



function TodoList() {


  const [todos, setTodos] = useState([])
  const [filter,setFilter] = useState('all');

  useEffect(() => {

    fetchTodos()

  }, [])



  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  // filter task

  const filteredTasks= todos.filter(task=>{
    if(filter === 'all') return true;
    if(filter === 'completed') return task.completed;
    if(filter === 'pending') return !task.completed;
    return true;
  })


  // delete task

  const deleteTask = async (id) => {

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`,
        {
          method: 'DELETE',
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setTodos(todos.filter((task) => task.id !== id))
      console.log("item deleted");

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }


  // handle complete

  const handleToggleComplete = async (id) => {
    const task = todos.find((task) => task.id === id);
    const updatedTask = { ...task, completed: !task.completed };

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setTodos(todos.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <>

      <div className="container mx-auto p-6 bg-slate-600 ">
      <div className="flex space-x-2 absolute ml-[6rem]">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-1 rounded-md text-sm text-white ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-2 py-1 rounded-md text-white ${filter === 'completed' ? 'bg-green-600' : 'bg-gray-400 hover:bg-gray-500'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-2 py-1 rounded-md text-white ${filter === 'pending' ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-500'}`}
        >
          Pending
        </button>
      </div>

        <div className='flex justify-end mr-[8rem] mb-5' >
          <Link to='/add-task'>  <button type="button" class="text-gray-800 bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-gray-900 "><div className='flex gap-1'><PlusCircle /><span>Add Task</span></div></button></Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mx-5  px-10 ">

          {filteredTasks.map((task) => (

            <TodoCard key={task.id} task={task} onDelete={deleteTask} handleToggleComplete={handleToggleComplete} />

          ))

          }

        </div>
      </div>

    </>
  )
}

export default TodoList