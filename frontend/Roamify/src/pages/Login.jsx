import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  const GoogleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.log(result.user);
      // navigate("/dashboard");
    }
  };
  // const [guestStatus, setGuestStatus] = useState('not logged in');

  if (Cookies.get("GuestLoginStatus") == null) {
    Cookies.set("GuestLoginStatus", false);
  }
  //   console.log(Cookies.get('GuestLoginStatus')+'boiiii');
  const GuestLoginHandler = () => {
    Cookies.set("GuestLoginStatus", true);

    navigate("/dashboard");
    location.reload();
    console.log(Cookies.get("GuestLoginStatus"));
  };
  return (
    <>
      <div className="rounded-lg shadow-xl text-center  sm:p-20 sm:m-20 p-5 dark:bg-dark-grey  mx-auto text-text-secondary my-auto">
        <h1 className="text-3xl font-medium text-center dark:text-white">
          Welcome to Roamify
        </h1>

        <div className="py-4">
          {" "}
          <h3 className="text-center text-text-secondary">
            Sign in with one of the below
          </h3>
        </div>

        <div className="py-3 flex flex-col gap-3">
          {/* <button  className="bg-purple-main/30 dark:text-white p-5 flex align-middle rounded-xl md:m-2 gap-5"><FcGoogle className="text-2xl  "/>  Sign in with Google</button> */}
          <button
            onClick={GoogleLogin}
            className="bg-purple-main/30 text-white p-5 flex align-middle rounded-xl m-2 mt-4 gap-5 mx-auto">
            <FcGoogle className="text-2xl  " />
            Sign in with Google
          </button>
          <button className="bg-purple-main/30 text-white p-5 flex align-middle rounded-xl m-2 mt-4 gap-5 mx-auto">
            <AiFillFacebook className="text-2xl text-facebook  " />
            Sign in with Facebook
          </button>
          {/* <button className="bg-purple-main/30 dark:text-white p-5 flex align-middle rounded-xl md:m-2 gap-5"><AiFillFacebook className="text-2xl text-facebook"/>Sign in with Facebook</button> */}
        </div>

        <hr className="m-10" />
        {/* <h2 className="text-3xl font-medium mt-6 mx-auto text-center text-white">Continue as Guest</h2> */}
        <button
          onClick={GuestLoginHandler}
          className="bg-pink-main text-white p-5 flex align-middle rounded-xl m-2 mt-4 gap-5 mx-auto">
          <FaUserAlt className="text-2xl" /> Continue as Guest
        </button>
      </div>
    </>
  );
};

export default Login;
