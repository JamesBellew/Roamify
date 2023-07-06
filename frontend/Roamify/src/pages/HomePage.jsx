import React from 'react';
import SideBar from './SideBar';
import Login from './Login';
const HomePage = () => {
    return (
        <>
        <SideBar/>
        <section class="flex-1 flex bg-gray-900 bg-opacity-20 ">
   <Login/>
            

      
        </section>
        </>
    );
};

export default HomePage;