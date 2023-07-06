import React from 'react';

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
      
<div class="bg-dark-grey shadow sm:w-60 min-h-screen w-14 pt-4 transition-all">
<div class="text-left text-2xl font-medium tracking-widest text-white p-6 hidden lg:block md:block sm:block">
    Roamify

</div>
<ul class="mt-11">
  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center active">

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z" fill="#fff"/>
</svg>


<span class="ml-3 hidden sm:block  font-semibold tracking-wide text-text-secondary first-letter:transition-colors text-sm"> Dashboard</span>
  </li>
  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.11304 4.5H11.9051C14.3271 4.5 16.0181 6.16904 16.0181 8.56091V15.4391C16.0181 17.831 14.3271 19.5 11.9051 19.5H6.11304C3.69102 19.5 2 17.831 2 15.4391V8.56091C2 6.16904 3.69102 4.5 6.11304 4.5ZM19.958 6.87898C20.397 6.65563 20.912 6.67898 21.331 6.94294C21.75 7.20589 22 7.66274 22 8.16223V15.8384C22 16.3389 21.75 16.7947 21.331 17.0577C21.102 17.2008 20.846 17.2739 20.588 17.2739C20.373 17.2739 20.158 17.2231 19.957 17.1206L18.476 16.3734C17.928 16.0952 17.588 15.5369 17.588 14.9165V9.08305C17.588 8.46173 17.928 7.90335 18.476 7.62721L19.958 6.87898Z" fill="#5B575E"/>
</svg>

<span class="ml-3 hidden sm:block  text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm"> Video</span>
  </li>

  <li class="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center">


<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 10.6699C2 5.88166 5.84034 2 10.5776 2C12.8526 2 15.0343 2.91344 16.6429 4.53936C18.2516 6.16529 19.1553 8.37052 19.1553 10.6699C19.1553 15.4582 15.3149 19.3399 10.5776 19.3399C5.84034 19.3399 2 15.4582 2 10.6699ZM19.0134 17.6543L21.568 19.7164H21.6124C22.1292 20.2388 22.1292 21.0858 21.6124 21.6082C21.0955 22.1306 20.2576 22.1306 19.7407 21.6082L17.6207 19.1785C17.4203 18.9766 17.3076 18.7024 17.3076 18.4164C17.3076 18.1304 17.4203 17.8562 17.6207 17.6543C18.0072 17.2704 18.6268 17.2704 19.0134 17.6543Z" fill="#5B575E"/>
</svg>


<span class="ml-3 hidden sm:block  text-text-secondary font-semibold tracking-wide hover:text-white transition-colors text-sm"> Search</span>
  </li>
  


 

</ul>

</div>


       </>
    );
};

export default SideBar;