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
import MapComponent from "../components/MapComponent";

// import { getFirestore, setDoc ,doc, updateDoc, addDoc,getDoc, QuerySnapshot} from 'firebase/firestore'
import StatisticsComponent from "../components/StatisticsComponent";
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

  // const [tableData, setData] = useState([]);

  // this is for testing of the new array strcuture for sprint 3
  const [newCountryArray, updateNewCountryArray] = useState([
    {
      countryName: "Argentina",
      countryRegion: "South America",
    },
    {
      countryName: "Bolivia",
      countryRegion: "South America",
    },
    {
      countryName: "Sucre",
      countryRegion: "South America",
    },
    {
      countryName: "Brazil",
      countryRegion: "South America",
    },
    {
      countryName: "Chile",
      countryRegion: "South America",
    },
    {
      countryName: "Colombia",
      countryRegion: "South America",
    },
    {
      countryName: "Ecuador",
      countryRegion: "South America",
    },
    {
      countryName: "France(French Guiana)",
      countryRegion: "South America",
    },
    {
      countryName: "Guyana",
      countryRegion: "South America",
    },
    {
      countryName: "Paraguay",
      countryRegion: "South America",
    },
    {
      countryName: "Peru",
      countryRegion: "South America",
    },
    {
      countryName: "Suriname",
      countryRegion: "South America",
    },
    {
      countryName: "Uruguay",
      countryRegion: "South America",
    },
    {
      countryName: "Venezuela",
      countryRegion: "South America",
    },

    {
      countryName: "Ireland",
      countryRegion: "Europe",
    },
    {
      countryName: "Mexico",
      countryRegion: "South America",
    },
    {
      countryName: "France",
      countryRegion: "Europe",
    },
    {
      countryName: "Spain",
      countryRegion: "Europe",
    },
    {
      countryName: "Italy",
      countryRegion: "Europe",
    },
    {
      countryName: "Finland",
      countryRegion: "Europe",
    },
    {
      countryName: "Poland",
      countryRegion: "Europe",
    },
    {
      countryName: "Holland",
      countryRegion: "Europe",
    },
    {
      countryName: "Croatia",
      countryRegion: "Europe",
    },
    {
      countryName: "Sweden",
      countryRegion: "Europe",
    },
    {
      countryName: "Ukraine",
      countryRegion: "Europe",
    },
    {
      countryName: "Serbia",
      countryRegion: "Europe",
    },
    {
      countryName: "Slovakia",
      countryRegion: "Europe",
    },
    {
      countryName: "Portugal",
      countryRegion: "Europe",
    },
    {
      countryName: "Switzerland",
      countryRegion: "Europe",
    },

    {
      countryName: "Albania",
      countryRegion: "Europe",
    },
    {
      countryName: "Latvia",
      countryRegion: "Europe",
    },
    {
      countryName: "Andorra",
      countryRegion: "Europe",
    },
    {
      countryName: "Liechtenstein",
      countryRegion: "Europe",
    },
    {
      countryName: "Armenia",
      countryRegion: "Europe",
    },
    {
      countryName: "Lithuania",
      countryRegion: "Europe",
    },
    {
      countryName: "Austria",
      countryRegion: "Europe",
    },
    {
      countryName: "Luxembourg",
      countryRegion: "Europe",
    },
    {
      countryName: "Azerbaijan",
      countryRegion: "Europe",
    },
    {
      countryName: "Malta",
      countryRegion: "Europe",
    },
    {
      countryName: "Belarus",
      countryRegion: "Europe",
    },
    {
      countryName: "Moldova",
      countryRegion: "Europe",
    },
    {
      countryName: "Belgium",
      countryRegion: "Europe",
    },
    {
      countryName: "Monaco",
      countryRegion: "Europe",
    },
    {
      countryName: "Bosnia and Herzegovina",
      countryRegion: "Europe",
    },
    {
      countryName: "Montenegro",
      countryRegion: "Europe",
    },
    {
      countryName: "Bulgaria",
      countryRegion: "Europe",
    },
    {
      countryName: "Netherlands",
      countryRegion: "Europe",
    },
    {
      countryName: "Croatia",
      countryRegion: "Europe",
    },
    {
      countryName: "Norway",
      countryRegion: "Europe",
    },
    {
      countryName: "Cyprus",
      countryRegion: "Europe",
    },
    {
      countryName: "Poland",
      countryRegion: "Europe",
    },
    {
      countryName: "Czech Republic",
      countryRegion: "Europe",
    },
    {
      countryName: "Portugal",
      countryRegion: "Europe",
    },
    {
      countryName: "Denmark",
      countryRegion: "Europe",
    },
    {
      countryName: "Romania",
      countryRegion: "Europe",
    },
    {
      countryName: "Estonia",
      countryRegion: "Europe",
    },
    {
      countryName: "Russia",
      countryRegion: "Europe",
    },
    {
      countryName: "Finland",
      countryRegion: "Europe",
    },
    {
      countryName: "San Marino",
      countryRegion: "Europe",
    },
    {
      countryName: "Former Yugoslav",
      countryRegion: "Europe",
    },
    {
      countryName: "Republic ofMacedonia",
      countryRegion: "Europe",
    },
    {
      countryName: "Serbia",
      countryRegion: "Europe",
    },
    {
      countryName: "France",
      countryRegion: "Europe",
    },
    {
      countryName: "Slovakia",
      countryRegion: "Europe",
    },
    {
      countryName: "Georgia",
      countryRegion: "Europe",
    },
    {
      countryName: "Slovenia",
      countryRegion: "Europe",
    },
    {
      countryName: "Germany",
      countryRegion: "Europe",
    },
    {
      countryName: "Spain",
      countryRegion: "Europe",
    },
    {
      countryName: "Greece",
      countryRegion: "Europe",
    },
    {
      countryName: "Sweden",
      countryRegion: "Europe",
    },
    {
      countryName: "Hungary",
      countryRegion: "Europe",
    },

    {
      countryName: "Iceland",
      countryRegion: "Europe",
    },
    {
      countryName: "Switzerland",
      countryRegion: "Europe",
    },
    {
      countryName: "Ireland",
      countryRegion: "Europe",
    },
    {
      countryName: "Turkey",
      countryRegion: "Europe",
    },
    {
      countryName: "Italy",
      countryRegion: "Europe",
    },
    {
      countryName: "Ukraine",
      countryRegion: "Europe",
    },
    {
      countryName: "Kosovo",
      countryRegion: "Europe",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "Europe",
    },
    // north america
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United no",
      countryRegion: "North America",
    },
    {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
    {
      countryName: "United Njjj",
      countryRegion: "North America",
    },  
      {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },   
     {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },   
     {
      countryName: "United Kingdom",
      countryRegion: "North America",
    },
  ]);

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  console.log(newCountryArray);

  // this is just an exmaple array used for the FaList, idealy we would want this coming froma  json file but this will do as a proof of consept

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
      removeByAttr(newCountryArray, "countryName", countriesArray[i]);
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
            onClick={() => countryFilterHandler("South America")}
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
            onClick={() => countryFilterHandler("South America")}
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
                <div class="flex items-center px-1  rounded mr-1">
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
        </div>
     
    </>
  );
};

export default CountryListComponent;
