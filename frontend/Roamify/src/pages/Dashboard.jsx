import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Login from "./Login";
import Cookies from "js-cookie";
import { auth } from "../utils/firebase";
import { initializeApp } from "firebase/app";
// import { db } from '../utils/firebase';
// import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  update,
} from "firebase/database";

// import { getFirestore, setDoc ,doc, updateDoc, addDoc,getDoc, QuerySnapshot} from 'firebase/firestore'

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  const [tableData, setData] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDKL_4B3j2OmIKPppgT0xrLjIQGv2Ru4Jo",
    authDomain: "roamify-9731d.firebaseapp.com",
    databaseURL: "https://roamify-9731d-default-rtdb.firebaseio.com",
    projectId: "roamify-9731d",
    storageBucket: "roamify-9731d.appspot.com",
    messagingSenderId: "431369203090",
    appId: "1:431369203090:web:d380c8bfb258a10640e54b",
    measurementId: "G-TB8BJ8CGGS",
  };

  // This function is called on the button clicked, all information will be supplied byt he google auth object besides the countries array
  function testDataWrite(userId, name, email, imageUrl, countries) {
    const db = getDatabase();

    if (countryArray.length === 0) {
      alert("you need to select a country");
    } else {
      const countriesRef = ref(db, "users/" + userId + "/countries");
      countryArray.forEach((country) => {
        push(countriesRef, country);
      });
      // the below commented out is not needed Headers, but will be needed in the signup part to store userts info
      // update(ref(db, "users/" + userId), {
      //   username: name,
      //   email: email,
      //   profile_picture: imageUrl,
      // });
    }
  }

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const reference = ref(db, "users/0123/countries");

  onValue(reference, (snapshot) => {
    const records = [];
    snapshot.forEach((childrenSnapshot) => {
      let keyName = childrenSnapshot.key;
      let data = childrenSnapshot.val();
      records.push({ key: keyName, data: data });
    });
    // here is where we need to clear the temp array as the items were pushed to rtdb
  });
  // the below array and function is for when the user clicks on a checkbox of a country it will be added to a temp array(useState array countryArray) awaiting for the user to click on the save button and then this will be added to the firabse databse
  const [countryArray, updateCountryArray] = useState([]);
  function handleOnChange(name) {
    updateCountryArray((countryArray) => [...countryArray, name]);
    // the below code asks the user is they want to reload the page as their changes wont be saved unless they click on the submit button
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage =
        "It looks like you have been editing something. " +
        "If you leave before saving, your changes will be lost.";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }
  console.log(countryArray);
  //  This is the return JSX for this file
  return (
    <>
      <SideBar />

      <div class="p-10 sm:ml-64">
        <div class="p-4  min-h-[90vh] bg-white/5  dark:bg rounded-lg  mt-14">
          {!user && Cookies.get("GuestLoginStatus") == "false" && <Login />}
          {user && (
            <>
              <div class="grid sm:grid-cols-2  xl:grid-cols-4  gap-4">
                <div className="bg-background-main/10 rounded p-5 min-h-[20vh]">
                  <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
                    Europe
                  </h3>
                  <ul class="w-full mx-auto text-sm font-medium text-gray-900 bg-white   rounded-lg dark:bg-background-main/20   dark:text-white">
                    <li class="w-full  border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center pl-3">
                        <input
                          type="checkbox"
                          onChange={() => handleOnChange("Finland")}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="vue-checkbox"
                          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Finland
                        </label>
                      </div>
                    </li>
                    <li class="w-full  border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          onChange={() => handleOnChange("Austria")}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="react-checkbox"
                          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Austria
                        </label>
                      </div>
                    </li>
                    <li class="w-full  border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="angular-checkbox"
                          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Croatia
                        </label>
                      </div>
                    </li>
                    <li class="w-full  border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center pl-3">
                        <input
                          id="laravel-checkbox"
                          type="checkbox"
                          value=""
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="laravel-checkbox"
                          class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Slovenia
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Europe</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Europe</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Europe</h1>
                </div>
              </div>

              <button
                onClick={() =>
                  testDataWrite(
                    user.uid,
                    user.displayName,
                    user.email,
                    user.photoURL
                  )
                }
                className="bg-pink-main p-4 rounded mx-auto text-center flex">
                Add Data
              </button>
            </>
          )}
          {Cookies.get("GuestLoginStatus") == "true" && (
            <h1>Logged in as a guest</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
