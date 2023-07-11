import React, { useState } from 'react';
import SideBar from './SideBar';
import Login from './Login';
import { auth } from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import Cookies from 'js-cookie';
const HomePage = () => {
        const [user,loading] = useAuthState(auth);
         const [GuestAuth,setGuestAuth] = useState(Cookies.get('GuestLoginStatus'));
        // console.log(GuestAuth);
    console.log(Cookies.get('GuestLoginStatus'));
    return (
        <>
       
    


      
           <SideBar/>
                  
<div class="p-4 sm:ml-64">
   <div class="p-4    dark:bg rounded-lg  mt-14">
    {GuestAuth=='false'
    //  & !Cookies.get('GuestLoginStatus')
    // || GuestAuth=='false'
     &&
         <Login/> 
    }
 {/* {GuestAuth == 'false' &&
 
 <Login/>} */}
   </div>
</div>
        </>
    );
};

export default HomePage;