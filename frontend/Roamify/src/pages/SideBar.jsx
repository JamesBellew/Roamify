import React from 'react';
import {FaLocationArrow} from 'react-icons/fa';
import {FaHome} from 'react-icons/fa';
import {FaChartBar} from 'react-icons/fa';
import {FaUser} from 'react-icons/fa';
import {FaMoon} from 'react-icons/fa';
import {FaRegCircle} from 'react-icons/fa';
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
  
<ul className='ml-6'>
<li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">


<FaRegCircle className='h-2 w-2 text-purple-main shadow-purple-main shadow-2xl'/>


<span class="ml-3 hidden sm:block   text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm"> Settings</span>

</li>
</ul>
<ul className='ml-6'>
<li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">


<FaRegCircle className='h-2 w-2 text-text-secondary shadow-purple-main shadow-2xl'/>


<span class="ml-3 hidden sm:block   text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm"> Invite</span>

</li>
</ul>


 

</ul>

<div className='bg-dark-grey h-auto w-20 p-5  rounded
 mx-auto absolute bottom-10 hidden sm:block sm:w-52 sm:m-4'>
  
  <div className='bg-background-main w-12 h-12 flex mx-auto rounded-full'><FaUser className='text-white my-auto mx-auto '/></div>


<p className='  text-base m-3 text-center mb-5 text-purple-main'>Guest</p> 

<div className='bg-grey/20 w-14 h-8  mx-auto my-auto flex  rounded-full mt-10'><FaMoon className='my-auto ml-2 text-text-secondary'/></div>

 </div>

</div>


       </>
    );
};

export default SideBar;