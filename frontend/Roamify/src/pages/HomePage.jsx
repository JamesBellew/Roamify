import React from 'react';
import SideBar from './SideBar';
import Login from './Login';
import { auth } from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
const HomePage = () => {
        const [user,loading] = useAuthState(auth);
    return (
        <>
       
    


      
           <SideBar/>
                  
<div class="p-4 sm:ml-64">
   <div class="p-4    dark:bg rounded-lg  mt-14">
    {!user &&
         <Login/> 
    }
   </div>
</div>
        </>
    );
};

export default HomePage;