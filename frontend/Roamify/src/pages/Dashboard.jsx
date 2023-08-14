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
import MapComponent from "../components/MapComponent";
import CountryListComponent from "../components/CountryListComponent";
import { v4 as uuidv4 } from "uuid";
// import { getFirestore, setDoc ,doc, updateDoc, addDoc,getDoc, QuerySnapshot} from 'firebase/firestore'
import StatisticsComponent from "../components/StatisticsComponent";
const Dashboard = (props) => {
  const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
      0x67, 0x1c, 0x58, 0x36,
    ],
  };
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
  const [data, setData] = useState({});
  const [countryBtnShow, updateShowBtn] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

  const [userId, updateUserID] = useState("s2fzRx7aPuWaQpWJqncb006Ilw03");
  const [countrriesRef, updateCountryRef] = useState(
    ref(db, "users/" + userId + "/countries")
  );

  //? This is the check to see if the user is logged in.
  //Todo - If the user is logged in Via Google Auth
  //* Then we assign it the Google Auth UUID.
  //* Keep the saved countries list using the databse retreival and pushing

  //Todo - If the user is not signed in Via Google
  //* Check if the user has an array of countries in the localstorage
  //* If not array exists, this is their first time visiting the site
  //* Create blank array for the countries visited
  //* Function for ticking off countries must now be calling the local storage array, not the database array(only for Logged in users)
  //* Function for Removal of visited countreies to be calling the localstorage array instead of the database array

  //! the below lines of code is for testing and will need to be deleted
  const TestData = [
    { name: "Australia", Region: "Australia" },
    { name: "United Kingdom", Region: "Europe" },
    { name: "Ireland", Region: "Europe" },
    { name: "France", Region: "Europe" },
  ];
  const jsonData = JSON.stringify(TestData);
  useEffect(() => {
    console.log("in here");
    //* if there is a user then we can assign the user id variable with the google uid value.
    if (user) {
      updateUserID("s2fzRx7aPuWaQpWJqncb006Ilw02");
    } else if (!user) {
      //! this will need to be removed, as this is using the old database storage for a guest user
      updateUserID("uuidv4(v4options)");
      //! The below is for testing only, this will need to be deleted

      if (localStorage.getItem("countries") === null) {
        localStorage.setItem("countries", jsonData);
      }
      localStorage.setItem("countries", jsonData);
    }
  }, [user]); //* Empty dependency array, so this useEffect runs only once on mount
  const storedData = localStorage.getItem("countries");
  const parsedData = JSON.parse(storedData);
  console.log(parsedData);
  useEffect(() => {
    onValue(countrriesRef, (snapshot) => {
      // Iterate over each child snapshot within the "countries" list
      snapshot.forEach((childSnapshot) => {
        // Get the data from the child snapshot and push it to the array
        const countryData = childSnapshot.val();
        countriesArray.push(countryData);
      });
    });
  }, [countrriesRef]); // Add countrriesRef as a dependency to this useEffect to re-run it when countrriesRef changes
  useEffect(() => {
    updateCountryRef(ref(db, "users/" + userId + "/countries"));
  }, [userId]);
  // ...rest of your component code

  //? this will need to be changerd to getb the usert that is logged in, this caused a bug, so entering it in manually for the moment

  // const [userId, updateUserID] = useState("s2fzRx7aPuWaQpWJqncb006Ilw03");
  // const [countrriesRef, updateCountryRef] = useState(
  //   ref(db, "users/" + userId + "/countries")
  // );

  // useEffect(() => {
  //   //if there is a user then we can asing the user id variable with the google uid value. this will be conistant with the users data
  //   if (user) {
  //     // console.log("signed in as user");
  //    // updateUserID(user.uid);
  //     //updateCountryRef(ref(db, "users/", user.uid, "/countries"));
  //   //} else {
  //     //there is no user logged in via the google auth. We now need to see if the user has been to the site before and logged data as a guest using the local storage.
  //    // if (localStorage.getItem("userID") === null) {
  //       //the user has never been here before
  //       console.log("the user has never been here before");
  //       //now we need to supply the user with a UID.
  //       localStorage.setItem("userID", "uuidv4(v4options)");
  //       //now update the variabe for user ID
  //       //   //user has not been here before
  //       //   //need to set him a new ID
  //       //   console.log(uuidv4(v4options));
  //       //   updateUserID("uuidv4(v4options)");
  //     }
  //     //the user has been here before, we do not need to do anything with the id, can use the local storage one
  //     updateUserID(localStorage.getItem("userID"));
  //     updateCountryRef(ref(db, "users/uuidv4(v4options)/countries"));
  //     // console.log('user is not logged in via google auth');
  //   }

  //   onValue(countrriesRef, (snapshot) => {
  //     // Iterate over each child snapshot within the "countries" list
  //     snapshot.forEach((childSnapshot) => {
  //       // Get the data from the child snapshot and push it to the array
  //       const countryData = childSnapshot.val();
  //       countriesArray.push(countryData);
  //     });
  //   });
  // });
  // console.log(reference);

  // const reference = ref(db, "users/",userId,"/countries");
  const [reference, updateRef] = useState(
    ref(db, "users/", userId, "/countries")
  );

  // this is for testing of the new array strcuture for sprint 3
  const [newCountryArray, updateNewCountryArray] = useState([
    {
      countryName: "Irelandmmm",
      countryRegion: "Europe",
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

  // console.log(newCountryArray);

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
    console.log("clicked");
    console.log(countryName);

    // const countriesRef = ref(db, "users/" + userId + "/countries");
    for (let i = 0; i < countriesArray.length; i++) {
      console.log("before if statement");
      if (countriesArray[i].name === countryName) {
        console.log("made into the remove loop");
        remove(countriesArray, countriesArray[i]);
        set(countrriesRef, countriesArray);
        removeVisitedcountries();
        removeCheckboxes()
          .then(() => {
            // window.location.reload(false);
          })
          .catch((error) => {
            console.error("Error updating countriesb in the database:", error);
          });
      }
    }
  };
  // now we want to check has the user been to any of the example array countries

  const removeVisitedcountries = () => {
    console.log(countriesArray + "fuckkkkk");
    // console.log("User Database countries", countriesArray);
    for (let i = 0; i < countriesArray.length; i++) {
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
        // push(countriesRef, country);
        updateShowBtn(false);
        updateCountryArray([]);
        removeCheckboxes();
      });
    }
  }

  // this usestate is used to track the statistics of europe visited
  const [europeProgress, updateEuropeProgress] = useState(
    countriesArray.length
  );

  const [countryArray, updateCountryArray] = useState([]);

  function handleOnChange(name) {
    updateCountryArray((countryArray) => [...countryArray, name]);
    updateShowBtn(true);
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

    // Clean up the event listener when the component unmounts or when userId changes
    return () => {
      unsubscribe();
    };
  }, [userId]); // Add userId to the dependency array

  const removeCheckboxes = () => {
    const clist = document.getElementsByClassName("inputCountry");
    for (let i = 0; i < clist.length; ++i) {
      clist[i].checked = false;
    }
  };

  // this function is called when the user adds rthe countries to the visited array and this functions unchecks all the

  // this is where I will gather the percentages of europe visited
  const [filter, updateFilter] = useState("Europe");
  const [mapcountryData, updateMapCountryData] = useState([{}]);
  const pull_data = (EuropeFilter) => {
    //  updateFilter(EuropeFilter); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  };

  let countryConditional = [{}];
  if (user) {
    countryConditional = data;
  } else if (!user) {
    countryConditional = parsedData;
  }

  // onValue(reference, (snapshot) => {
  //   const records = [];
  //   snapshot.forEach((childrenSnapshot) => {
  //     let keyName = childrenSnapshot.key;
  //     let data = childrenSnapshot.val();
  //     records.push({ key: keyName, data: data });
  //   });
  //   console.log(data);
  // });

  //  This is the return JSX for this file
  return (
    <>
      <SideBar />

      <div class="p-5 sm:ml-64">
        <div class="p-4  min-h-[90vh] bg-white/5  dark:bg rounded-lg  mt-14">
          {user ? (
            <h1>
              Logged in as user {userId} // {user.uid}
            </h1>
          ) : (
            <p>Not logged in supplyin {userId}</p>
          )}
          {/* {!user && Cookies.get("GuestLoginStatus") == "false" && <Login />} */}

          {
            // user   && (
            <>
              <MapComponent countries={countryConditional} userId={userId} />
              <CountryListComponent
                func={pull_data}
                countries={countryConditional}
                userID={userId}
              />

              <div class="grid sm:grid-cols-2 over  xl:grid-cols-4 mt-5 gap-4">
                <div className="bg-background-main/50 overflow-auto rounded p-3 sm:h-auto h-96 col-span-3 ">
                  <h1 className="text-white text-lg mb-2">Visited Countries</h1>

                  <ul key={1}>
                    {user &&
                      Object.keys(data).map((key) => (
                        <li
                          key={key}
                          class="w-auto inline-block border-gray-200 rounded-t-lg dark:border-gray-600">
                          <div class="flex items-center   rounded px-1">
                            <input
                              type="checkbox"
                              onChange={() =>
                                removeFromCountryArrayHandler(data[key].name)
                              }
                              class="test inputCountry w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="vue-checkbox"
                              class="w-full py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {data[key].name}
                            </label>
                          </div>
                        </li>
                      ))}

                    {!user &&
                      Object.keys(parsedData).map((key) => (
                        <li
                          key={key}
                          class="w-auto inline-block border-gray-200 rounded-t-lg dark:border-gray-600">
                          <div class="flex items-center   rounded px-1">
                            <input
                              type="checkbox"
                              onChange={() =>
                                removeFromCountryArrayHandler(
                                  parsedData[key].name
                                )
                              }
                              class="test inputCountry w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              for="vue-checkbox"
                              class="w-full py-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {parsedData[key].name}
                            </label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                <StatisticsComponent
                  progress={countryConditional.length}
                  filter={filter}
                  visitedArray={countryConditional}
                />
              </div>
            </>
            // )
          }
        </div>
      </div>
    </>
  );
};

export default Dashboard;
