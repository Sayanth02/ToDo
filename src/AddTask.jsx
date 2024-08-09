import React, { useState } from 'react'
import { Calendar } from 'react-feather';
import { Navigate, useNavigate } from 'react-router-dom';






function AddTask() {

  const [taskId, setTaskId] = useState()
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDes, setTaskDes] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  // console.log(taskTitle);
  // console.log(taskDes);
  // console.log(selected);



  const navigate = useNavigate();


  // Function to handle date change from ReactDatePicker


  console.log(selectedDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      id: taskId,
      title: taskTitle,
      description: taskDes,
      dueDate: selectedDate,
      completed: false



    };

    try {

      // Fetch existing tasks to check for duplicate ID
      const res = await fetch('http://localhost:5000/todos');
      const existingTasks = await res.json();

      // Check if the ID already exists
      const idExists = existingTasks.some(task => task.id === newTask.id);

      if (idExists) {
        alert('ID already exists. Please choose a different ID.');
        return;
      }

      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Task added:', data);
      alert('Task added succesfully')
      navigate('/')


      // Clear the form fields after successful submission
      setTaskTitle('');
      setTaskDes('');
      setTaskDueDate('')


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };









  return (

    <>
      <div className='container mx-auto p-4 bg-slate-600 '>


        <form onSubmit={handleSubmit} class="max-w-sm mx-auto  shadow dark:bg-gray-800  p-5  rounded ">

          <div className='text-center text-white text-lg font-extrabold mb-5 flex items-center justify-center gap-2'><Calendar/>Add Task</div>

          {/* id */}
          <div className='mb-3'>
            <label for="task_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title</label>
            <input onChange={(e) => setTaskId(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="id" required />
          </div>

          {/* title */}
          <div className='mb-3'>
            <label for="task_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title</label>
            <input onChange={(e) => setTaskTitle(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
          </div>
          {/* description */}
          <div class="mb-3">

            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea onChange={(e) => setTaskDes(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Write your thoughts here... " ></textarea>
          </div>

          {/* duedate */}

          <div class="mb-3">

            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input className='bg-slate-700 px-2 py-2 rounded text-white' type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} name="" id="" required />
          </div>


          <div className="text-center mt-5">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Task
            </button>
          </div>

        </form>

      </div>
    </>
  )

}




export default AddTask