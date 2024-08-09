import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-feather';
import {useNavigate, useParams } from 'react-router-dom';






function UpdateTask() {

  const [taskId, setTaskId] = useState()
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDes, setTaskDes] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();
  const {id} = useParams() ;

  useEffect(() => {
    // Fetch the task data based on ID
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/todos/${id}`);
        const data = await response.json();
        console.log(data);
        setTaskId(data.id)
        setTaskTitle(data.title);
        setTaskDes(data.description);
        setDueDate(new Date(data.dueDate));
      } catch (error) {
        console.error('Failed to fetch task:', error);
      }
    };
    fetchTask();
  }, [id]);

  // Function to handle date change from ReactDatePicker
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      id: taskId,
      title: taskTitle,
      description: taskDes,
      dueDate: selectedDate



    };

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

      const data = await response.json();
      console.log('Task updated:', data);
      alert('Updated succesfully')
      navigate('/')


 


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };









  return (

    <>
      <div className='container mx-auto p-4 bg-slate-600 '>


        <form onSubmit={handleSubmit} class="max-w-sm mx-auto  shadow dark:bg-gray-800  p-5  rounded ">

          <div className='text-center text-white text-lg font-extrabold mb-5 flex items-center justify-center gap-2'><Calendar/>Update Task</div>
               
          {/* task id */}
          <div className='mb-3'>
            <label for="task_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white " > Title</label>
            <input value={taskId} onChange={(e) => setTaskId(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="id" required />
          </div>

          {/* title */}
          <div className='mb-3'>
            <label for="task_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Title</label>
            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
          </div>
          {/* description */}
          <div class="mb-3">

            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea value={taskDes} onChange={(e) => setTaskDes(e.target.value)} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="Write your thoughts here... " ></textarea>
          </div>

   
          {/* dueDate */}

          <div class="mb-3">

            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input className='bg-slate-700 px-2 py-2 rounded text-white'  type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}  name="" id="" />
          </div>


          <div className="text-center mt-5">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>

        </form>

      </div>
    </>
  )

}




export default UpdateTask