import React from 'react';
import { Edit, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';

function TodoCard({ task, onDelete, handleToggleComplete }) {
  const dueDate = new Date(task.dueDate);
  const day = dueDate.getDate();
  const month = dueDate.getMonth() + 1;
  const year = dueDate.getFullYear();
  const currentDate = new Date();
  const remainingDays = Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24));
  console.log(remainingDays);


  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-10 mb-10">

      {/* title & description */}
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
        <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">{task.description}</p>
      </div>
      {/* date  */}
      <div className="flex lg:flex-row sm:flex-col  lg:justify-between sm:justify-items-start items-center mb-2 mt-5">
        <div className="text-sm md:text-md flex  items-center bg-blue-500 text-white p-2 rounded-md sm:mb-2">
          <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h2a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h2V2zM4 7v9a1 1 0 001 1h10a1 1 0 001-1V7H4zm4 3a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">{day}/</span>
          <span className="font-semibold">{month}/</span>
          <span className="font-semibold">{year}</span>
        </div>

        {/* status */}
        <button
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${task.completed ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300' : 'bg-red-500 hover:bg-red-700 focus:ring-red-300'}`}
          onClick={() => handleToggleComplete(task.id)}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </button>
      </div>

      <div className={` p-2 rounded-md ${remainingDays < 0 ? 'bg-red-500 ' : 'bg-green-500'} ${task.completed ? 'bg-green-500': ''}`}>
        {remainingDays < 0  ? 'Overdue' : `${remainingDays} days left`} 
      </div>

      <div className="flex justify-end items-center space-x-2">
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
        >
          <Trash2 />
        </button>
        <Link to={`/update-task/${task.id}`}>
          <button className="text-yellow-500 mt-1 hover:text-yellow-600">
            <Edit />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TodoCard;
