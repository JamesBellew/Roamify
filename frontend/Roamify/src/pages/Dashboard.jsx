import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Login from "./Login";
import Cookies from "js-cookie";
import { auth } from "../utils/firebase";
import { initializeApp } from "firebase/app";
// import { db } from '../utils/firebase';
// import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import countries from "../utils/countries.json";
import {
  getDatabase,
  onValue,
  ref,
  get,
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
  // this will need to be changerd to getb the usert that is logged in, this caused a bug, so entering it in manually for the moment
  const userId = "s2fzRx7aPuWaQpWJqncb006Ilw02";
  const countrriesRef = ref(db, "users/" + userId + "/countries");

  // const [tableData, setData] = useState([]);

// this is for testing of the new array strcuture for sprint 3 
const [newCountryArray,updateNewCountryArray] = useState([
    {
        "countryName":"Irelandmmm",
        "countryRegion": "Europe"
},
{
    "countryName":"France",
    "countryRegion": "Europe"
},
{
    "countryName":"Spain",
    "countryRegion": "Europe"
}
])

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}

console.log(newCountryArray)

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
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Åland Islands",
    "the Azores",
    "Canary Islands",
    "French Guiana",
    "Gibraltar",
    "Guadeloupe",
    "Madeira",
    "Martinique",
    "Mayotte",
    "Réunion",
    "Saint Martin",
  ]);
  {
    // countries.countries.map((item, i) => countryList.push(item.name));
  }
  function remove(arr, what) {
    var found = arr.indexOf(what);
    // console.log(arr);
    // console.log(what);
    // console.log("called");
    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }

  // this funcrtion is called when the user wants to remove A country from their gvisted countries array
  const removeFromCountryArrayHandler = (countryName) => {
    const countriesRef = ref(db, "users/" + userId + "/countries");
    for (let i = 0; i < countriesArray.length; i++) {
      if (countriesArray[i] === countryName) {
        remove(countriesArray, countriesArray[i]);
        set(countriesRef, countriesArray);
        removeVisitedcountries()
          .then(() => {
            // window.location.reload(false);
          })
          .catch((error) => {
            console.error("Error updating countries in the database:", error);
          });
      }
      // console.log(countriesArray[i]);
      // // countryList.filter((v) => v !== countriesArray[i]);
      // remove(countryList, countriesArray[i]);
    }
  };
  // now we want to check has the user been to any of the example array countries
  onValue(countrriesRef, (snapshot) => {
    // Iterate over each child snapshot within the "countries" list
    snapshot.forEach((childSnapshot) => {
      // Get the data from the child snapshot and push it to the array
      const countryData = childSnapshot.val();
      countriesArray.push(countryData);
    });
  });

  const removeVisitedcountries = () => {
    // console.log("User Database countries", countriesArray);
    for (let i = 0; i < countriesArray.length; i++) {
      // console.log(countriesArray[i]);
      // countryList.filter((v) => v !== countriesArray[i]);
    //   remove(newCountryArray, countriesArray[i]);
      removeByAttr(newCountryArray, 'countryName', countriesArray[i]);   
    }
  };
  removeVisitedcountries();

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
        updateCountryArray([]);
        removeCheckboxes();
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
  // this usestate is used to track the statistics of europe visited
  const [europeProgress, updateEuropeProgress] = useState(
    countriesArray.length
  );
  console.log(europeProgress);
  // the below array and function is for when the user clicks on a checkbox of a country it will be added to a temp array(useState array countryArray) awaiting for the user to click on the save button and then this will be added to the firabse databse
  const [countryArray, updateCountryArray] = useState([]);

  function handleOnChange(name) {
    updateCountryArray((countryArray) => [...countryArray, name]);
    updateShowBtn(true);

    // the below code asks the user is they want to reload the page as their changes wont be saved unless they click on the submit button

    // window.addEventListener("beforeunload", function (e) {
    //   var confirmationMessage =
    //     "It looks like you have been editing something. " +
    //     "If you leave before saving, your changes will be lost.";

    //   (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //   return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    // });
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

  const removeCheckboxes = () => {
    const clist = document.getElementsByClassName("inputCountry");
    for (let i = 0; i < clist.length; ++i) {
      clist[i].checked = false;
    }
  };

  // this function is called when the user adds rthe countries to the visited array and this functions unchecks all the

  // this is where I will gather the percentages of europe visited

  //  This is the return JSX for this file
  return (
    <>
      <SideBar />

      <div class="p-5 sm:ml-64">
        <div class="p-4  min-h-[90vh] bg-white/5  dark:bg rounded-lg  mt-14">
          {!user && Cookies.get("GuestLoginStatus") == "false" && <Login />}
          {user && (
            <>
              <div class="grid grid-cols-1  gap-4">
                <div className="bg-background-main/50 rounded p-1 sm:h-auto px-5 py-10  overflow-auto">
                  <h3 class="mb-1 w-[20%] text-center font-semibold bg-purple-main/20 p-1 rounded text-gray-900  dark:text-white">
                    Europe
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
                        className="bg-purple-main ml-2 p-1 rounded mx-auto text-center">
                        Add Visited Countries
                      </button>
                    )}
                  </h3>

                  <ul class="w-full mt-10 mx-auto text-sm font-medium text-gray-900 bg-white   rounded-lg dark:bg-background-main/10 shadow-sm   dark:text-white">
                    {/* {countryList.map((country) => (
                      // <li key={country.id}>{country}</li>
                      <li class="lg:w-[10%] md:w-[30%] sm:w-[50%] xs:w-[100%] inline-block border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div class="flex items-center pl-3">
                          <input
                            type="checkbox"
                            onChange={() => handleOnChange(country)}
                            class="test inputCountry w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for="vue-checkbox"
                            class="w-full py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {country}
                          </label>
                        </div>
                      </li>
                    ))} */}
          {newCountryArray.map((country) => (
                      // <li key={country.id}>{country}</li>
                      <li class="lg:w-[10%] md:w-[30%] sm:w-[50%] xs:w-[100%] inline-block border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div class="flex items-center pl-3">
                          <input
                            type="checkbox"
                            onChange={() => handleOnChange(country.countryName)}
                            class="test inputCountry w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            for="vue-checkbox"
                            class="w-full py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {country.countryName}
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
                {/* <div className="bg-background-main/10 shadow rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Asia</h1>
                  <div></div>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">South America</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Antarctica</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Australia</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">North America</h1>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Africa</h1>
                </div> */}
              </div>

              <div class="grid sm:grid-cols-2 over  xl:grid-cols-3 mt-5 gap-4">
                <div className="bg-background-main/10 overflow-auto rounded p-3 h-[40vh]">
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
                                    removeFromCountryArrayHandler(data[key])
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

                  <div class="flex justify-between mb-1 my-3">
                    <span class="text-base font-medium text-blue-700 dark:text-white">
                      Europe
                    </span>
                    <span class="text-sm font-medium text-blue-700 dark:text-white">
                      {(europeProgress / 10) * 100 + "%"}
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      class="bg-purple-main h-2.5 rounded-full"
                      style={{
                        width: (europeProgress / 10) * 100 + "%",
                      }}></div>
                  </div>
                </div>
                <div className="bg-background-main/10 rounded p-3 min-h-[20vh]">
                  <h1 className="text-white text-lg">Awards</h1>
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
