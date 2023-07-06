import React from 'react';
import {FaLocationArrow} from 'react-icons/fa';
import {FaHome} from 'react-icons/fa';
import {FaChartBar} from 'react-icons/fa';
import {FaUser} from 'react-icons/fa';
const SideBar = () => {
    
function reset(){
    document.querySelectorAll("li").forEach(li=>{
    li.classList.remove("active")
  })
  }
  
  
  
  document.querySelectorAll("li").forEach(li=>{
    li.addEventListener("click",()=>{
      reset()
      li.classList.add("active")
    })
  })
    return (
       <>
      
<div class="bg-dark-grey shadow sm:w-60 min-h-screen w-14 pt-4 transition-all ">
<div class=" text-2xl font-medium tracking-widest text-white p-3  mx-autop text-center ">
 <FaLocationArrow className='inline-block text-purple-main cursor-pointer  text-center mx-auto'/><span className='hidden lg:inline-block md:inline-block sm:inline-block m-2 '> Roamify</span>

</div>
<ul class="mt-11">
  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center active">

<FaHome className='h-5 w-5 text-grey-text'/>


<span class="ml-3 hidden sm:block  font-semibold tracking-wide text-text-secondary first-letter:transition-colors text-sm"> Home</span>
  </li>
  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">

  <FaChartBar className='h-5 w-5 text-grey-text'/>

<span class="ml-3 hidden sm:block  text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm">Statistics </span>
  </li>

  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">


  <FaUser className='h-5 w-5 text-grey-text'/>


<span class="ml-3 hidden sm:block  text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm"> Profile</span>
  </li>
  


 

</ul>

<div className='bg-background-main h-auto w-20 p-5  rounded
 mx-auto absolute bottom-10 hidden sm:block sm:w-40 sm:m-10'>
<h1 className='text-center text-white'>Hello</h1>
<br></br>
<br></br>
<button className="bg-purple-main/30 p-5 text-white  flex align-middle rounded-xl ">
Get Started</button>
 </div>

</div>


       </>
    );
};

export default SideBar;