import React, { useState } from 'react';
import SideBar from './SideBar';
import Login from './Login';
import Cookies from 'js-cookie';
import { auth } from '../utils/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { getFirestore, setDoc ,doc} from 'firebase/firestore'


const Dashboard = () => {
        const [user,loading] = useAuthState(auth);
        const firestore = getFirestore();
        const [name, setName] = useState("");
    // console.log(user.uid);
        const testAddFireData = () =>{
            event.preventDefault(); 
            console.log('clicked');
            console.log(name);
            const userGroupTest = doc(firestore,'UserData/01');
            const docData = {
                        UserName: 'James Bellew',
                        // UserAge: 25,
                        Countries: {name},
                    };
                    setDoc(userGroupTest,docData);
        }
        // const specialOfTheDay = doc(firestore,'dailySpecial/2021-09-14');
        // function writeDailySpecial(){
        //     const docData = {
        //         desciption: 'late',
        //         price: 2,
        //         milke: 'whole',
        //     };
        //     setDoc(specialOfTheDay,docData);
        // }
        // writeDailySpecial();
    return (
        <>
       
    


      
           <SideBar/>
                  
<div class="p-10 sm:ml-64">
   <div class="p-4  min-h-[90vh] bg-white/5  dark:bg rounded-lg  mt-14">
    {!user && Cookies.get('GuestLoginStatus')=='false'   &&
         <Login/> 
    }
    {user && 
    
<>
<ol class="relative border-l border-gray-200 dark:border-gray-700">                  
    <li class="mb-10 ml-6">            
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg" 
            src={user.photoURL}
            alt="Bonnie image"/>
        </span>
        <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
            <div class="text-sm font-normal text-gray-500 dark:text-gray-300">Bonnie moved <a href="#" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to <span class="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">Funny Group</span></div>
        </div>
    </li>
    <li class="mb-10 ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg" src={user.photoURL} alt="Thomas Lean image"/>
        </span>
        <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
            <div class="items-center justify-between mb-3 sm:flex">
                <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
                <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Thomas Lean commented on  <a href="#" class="font-semibold text-gray-900 dark:text-white hover:underline">Flowbite Pro</a></div>
            </div>
            <div class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.</div>
        </div>
    </li>
    <li class="ml-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <img class="rounded-full shadow-lg"  src={user.photoURL} alt="Jese Leos image"/>
        </span>
        <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">1 day ago</time>
            <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Jese Leos has changed <a href="#" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Pricing page</a> task status to  <span class="font-semibold text-gray-900 dark:text-white">Finished</span></div>
        </div>
    </li>
</ol>
<br></br>
        {/* // const specialOfTheDay = doc(firestore,'dailySpecial/2021-09-14');
        // function writeDailySpecial(){ */}
        {/* //     const docData = {
        //         desciption: 'late',
        //         price: 2,
        //         milke: 'whole',
        //     };
        //     setDoc(specialOfTheDay,docData);
        // }
        // writeDailySpecial(); */}
{/* <h1>Lets try soem DB action</h1> */}
{/* <form action="" className='mx-auto text-center mb-5'>
    <label htmlFor="">Enter Home Location</label>
<input type="text" name="username"/>
<br></br>
<br></br>

<button onClick={testAddFireData} className='bg-pink-main p-4 rounded mx-auto text-center flex'>Add Home</button>
</form> */}

<form>
      <label>Enter your name: 
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      
<button onClick={testAddFireData} className='bg-pink-main p-4 rounded mx-auto text-center flex'>Add Home</button>
    </form>
</>
    }
    {Cookies.get('GuestLoginStatus') =='true' &&
    
    <h1>Logged in as a guest</h1>
    }
   </div>
</div>
        </>
    );
};

export default Dashboard;