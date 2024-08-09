import React from 'react'
import { Calendar } from 'react-feather';

function Header() {
    const getCurrentDate = () => {
        const options = {  month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    }
    return (
        <>


            <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="logo.png" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ToDo</span>
                    </a>

                    <div className='flex items-center space-x-3 text-lg font-bold text-white'>
                       <div><Calendar/></div> 
                       <div> {getCurrentDate().toUpperCase()}</div>
                    </div>

                </div>
            </nav>

        </>
    )
}

export default Header