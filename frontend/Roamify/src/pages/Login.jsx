import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {AiFillFacebook} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
const Login = () => {
    return (
     <>
        <div className="rounded-lg shadow-xl text-center  sm:p-20 p-5 bg-dark-grey  mx-auto text-text-secondary my-auto">
        <h1 className="text-3xl font-medium text-center text-white">Welcome to Roamify</h1>
   
<div className="py-4">        <h3 className='text-center text-text-secondary'>Sign in with one of the below</h3>
</div>

 <div className="py-4 flex flex-col gap-4">
    <button  className="bg-purple-main/30 text-white p-5 flex align-middle rounded-xl md:m-2 gap-5"><FcGoogle className="text-2xl  "/>  Sign in with Google</button>
    <button className="bg-purple-main/30 text-white p-5 flex align-middle rounded-xl md:m-2 gap-5"><AiFillFacebook className="text-2xl text-facebook"/>Sign in with Facebook</button>
</div> 

<hr />
{/* <h2 className="text-3xl font-medium mt-6 mx-auto text-center text-white">Continue as Guest</h2> */}
<button  className="bg-pink-main text-white p-5 flex align-middle rounded-xl m-2 mt-4 gap-5 mx-auto"><FaUserAlt className='text-2xl'/> Continue as Guest</button>
</div>
     </>
    );
};

export default Login;