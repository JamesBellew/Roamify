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
  const countriesArray = [];
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [countryBtnShow, updateShowBtn] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const reference = ref(db, "users/0123/countries");
  const userId = user.uid;
  const countrriesRef = ref(db, "users/" + userId + "/countries");
  // const [tableData, setData] = useState([]);

  // this is just an exmaple array used for the FaList, idealy we would want this coming froma  json file but this will do as a proof of consept
  const [countryList, updateCountryList] = useState([
    "Finland",
    "Ireland",
    "Sweden",
    "Spain",
    "Austria",
    "Latvia",
    "Slovenia",
    "England",
    "Holland",
    "France",
    "Italy",
    "Croatia",
  ]);
  function remove(arr, what) {
    var found = arr.indexOf(what);
    console.log(arr);
    console.log(what);
    console.log("called");
    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }
  // now we want to check has the user been to any of the example array countries
  onValue(countrriesRef, (snapshot) => {
    // Iterate over each child snapshot within the "countries" list
    snapshot.forEach((childSnapshot) => {
      // Get the data from the child snapshot and push it to the array
      const countryData = childSnapshot.val();
      countriesArray.push(countryData);
    });
  });
  console.log("User Database countries", countriesArray);
  for (let i = 0; i < countriesArray.length; i++) {
    console.log(countriesArray[i]);
    // countryList.filter((v) => v !== countriesArray[i]);
    remove(countryList, countriesArray[i]);
  }

  // This function is called on the button clicked, all information will be supplied byt he google auth object besides the countries array
  function testDataWrite(userId, name, email, imageUrl, countries) {
    const db = getDatabase();

    if (countryArray.length === 0) {
      alert("you need to select a country");
    } else {
      const countriesRef = ref(db, "users/" + userId + "/countries");
      countryArray.forEach((country) => {
        push(countriesRef, country);
        updateShowBtn(false);
      });
      // the below is neede to remove the selected from the temp rray since it way added to the visited array

      // the below commented out is not needed Headers, but will be needed in the signup part to store userts info
      // update(ref(db, "users/" + userId), {
      //   username: name,
      //   email: email,
      //   profile_picture: imageUrl,
      // });
    }
  }

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
    updateShowBtn(true);

    // the below code asks the user is they want to reload the page as their changes wont be saved unless they click on the submit button

    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage =
        "It looks like you have been editing something. " +
        "If you leave before saving, your changes will be lost.";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
  }

  useEffect(() => {
    // Create a reference to the desired location in the database
    const reference = ref(db, "users/" + userId + "/countries");

    // Attach an event listener to listen for changes in the data
    const unsubscribe = onValue(reference, (snapshot) => {
      const dataFromDb = snapshot.val();
      // Update the state with the retrieved data
      setData(dataFromDb);
      // console.log(data);
      // console.log("above baiiiii");
      // console.log(Object.values(data));
      // tempArray = Object.values(data);
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

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
                <div className="bg-background-main/10 rounded p-5 min-h-[40vh]">
                  <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
                    Europe
                  </h3>
                  <ul class="w-full mx-auto text-sm font-medium text-gray-900 bg-white   rounded-lg dark:bg-background-main/10 shadow-sm   dark:text-white">
                    {countryList.map((country) => (
                      // <li key={country.id}>{country}</li>
                      <li class="w-full  border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div class="flex items-center pl-3">
                          <input
                            type="checkbox"
                            onChange={() => handleOnChange(country)}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for="vue-checkbox"
                            class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {country}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* <ul class="w-full mx-auto text-sm font-medium text-gray-900 bg-white   rounded-lg dark:bg-background-main/20   dark:text-white">
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
                  </ul> */}
                </div>
                <div className="bg-background-main/20 shadow rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Asia</h1>
                  <div></div>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">North America</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Africa</h1>
                </div>
              </div>
              {countryBtnShow && (
                <button
                  onClick={() =>
                    testDataWrite(
                      user.uid,
                      user.displayName,
                      user.email,
                      user.photoURL
                    )
                  }
                  className="bg-purple-main p-4 rounded mx-auto text-center flex my-10">
                  Add Data
                </button>
              )}
              <div class="grid sm:grid-cols-1 over  xl:grid-cols-2 mt-5 gap-4">
                <div className="bg-background-main/10 overflow-auto rounded p-3 h-[20vh]">
                  <h1 className="text-white text-lg mb-5">Visited Countries</h1>

                  <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-background-main/20 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Region
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Remove
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          Object.keys(data).map((key) => (
                            // <div key={key}>{data[key]}</div>
                            <tr
                              key={key}
                              class="bg-white border-b dark:bg-background-main/40 dark:border-gray-700">
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data[key]}
                              </th>
                              <td class="px-6 py-4">Europe</td>
                              <td class="px-6 py-4 mx-auto">
                                <input
                                  type="checkbox"
                                  onChange={() =>
                                    remove(countriesArray, data[key])
                                  }
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Statistics</h1>
                  <div></div>
                </div>
              </div>
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
