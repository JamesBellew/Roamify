import React, { useEffect, useState } from "react";

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
import MapComponent from "./MapComponent";
 import  {countryData} from './CountriesArray';
// import { getFirestore, setDoc ,doc, updateDoc, addDoc,getDoc, QuerySnapshot} from 'firebase/firestore'
import StatisticsComponent from "./StatisticsComponent";
const CountryListComponent = (props) => {

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
  const [countryFilter, updateCountryFilter] = useState("Europe");
  // this will need to be changerd to getb the usert that is logged in, this caused a bug, so entering it in manually for the moment
  const userId = "s2fzRx7aPuWaQpWJqncb006Ilw02";
  const countrriesRef = ref(db, "users/" + userId + "/countries");
  const [countryArray, updateCountryArray] = useState({});
  // const [tableData, setData] = useState([]);
  

console.log(countryFilter+' from the list comp');
  const [newCountryArray, updateNewCountryArray] 
  = useState(countryData);

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value.name
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };


  {

  }
  function remove(arr, what) {
    var found = arr.indexOf(what);
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
      removeByAttr(newCountryArray, "countryName", countriesArray[i]);
    }
  };
  removeVisitedcountries();



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
  // console.log(europeProgress);
  // the below array and function is for when the user clicks on a checkbox of a country it will be added to a temp array(useState array countryArray) awaiting for the user to click on the save button and then this will be added to the firabse databse
 

  function handleOnChange(name,region) {
    console.log("I;m here ya queddd");
    console.log(name+region);
    const db = getDatabase();
    const countriesRef = ref(db, "users/" + userId + "/countries");
    push(countriesRef,{"name":name,"Region":region});
    removeCheckboxes();
  }

  useEffect(() => {
    // Create a reference to the desired location in the database
    const reference = ref(db, "users/" + userId + "/countries");

    // Attach an event listener to listen for changes in the data
    const unsubscribe = onValue(reference, (snapshot) => {
      const dataFromDb = snapshot.val();
      // Update the state with the retrieved data
      setData(dataFromDb);
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

  const filteredCountryArray = newCountryArray.filter((country) => {
    return country.countryRegion === countryFilter;
  });

  const countryFilterHandler = (countryName) => {
    updateCountryFilter(countryName);
  };
  // this function is called when the user adds rthe countries to the visited array and this functions unchecks all the

  // this is where I will gather the percentages of europe visited

  props.func(countryFilter);
  //  This is the return JSX for this file
  return (
    <>
     
        <div className="bg-background-main/50 rounded p-1 sm:h-auto px-4 py-4  overflow-auto">
          <button
            onClick={() => countryFilterHandler("Europe")}
            style={countryFilter === "Europe" ? { background: "#8C54FB" } : {}}
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            Europe
          </button>
          <button
            onClick={() => countryFilterHandler("South America")}
            style={
              countryFilter === "South America" ? { background: "#8C54FB" } : {}
            }
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            South America
          </button>
          <button
            onClick={() => countryFilterHandler("North America")}
            style={
              countryFilter === "North America" ? { background: "#8C54FB" } : {}
            } 
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            North America
          </button>
          <button
            onClick={() => countryFilterHandler("Asia")}
            style={
              countryFilter === "Asia" ? { background: "#8C54FB" } : {}
            }
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            Asia
          </button>
          <button
            onClick={() => countryFilterHandler("Australia")}
            style={
              countryFilter === "" ? { background: "#8C54FB" } : {}
            }
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            Australia
          </button>
          <button
            onClick={() => countryFilterHandler("Africa")}
            style={
              countryFilter === "Africa" ? { background: "#8C54FB" } : {}
            }
            className="text-white  mb-1 bg-white/10 px-1 text-sm mr-1 py-1 rounded">
            Africa
          </button>
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
              className="bg-purple-main px-5 w-[20%] xl:w-[10%] text-white font-medium capitalize  p-1 rounded mx-auto text-center">
              Add 
            </button>
          )}
          <ul class="w-full mt-2 mx-auto text-sm font-medium text-gray-900 bg-white   rounded-lg dark:bg-background-main/10 shadow-sm   dark:text-white">
            {filteredCountryArray.map((country) => (
              // <li key={country.id}>{country}</li>
              <li class="w-auto inline-block border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center px-0  rounded mr-1">
                  <input
                    type="checkbox"
                    onChange={() => handleOnChange(country.countryName,country.countryRegion)}
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
        </div>
     
    </>
  );
};

export default CountryListComponent;
