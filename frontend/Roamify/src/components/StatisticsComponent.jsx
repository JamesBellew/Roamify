import React, { useState } from "react";

const StatisticsComponent = (props) => {

  const europeProgress = props.progress;
//   const [filterSelected,updateFilterSelected] = useState('Europe');
// updateFilterSelected(props.filter);
  // console.log(props.visitedArray);
 const regionVisitedCount = (region)=>{
  let count=0;
  for (const key in props.visitedArray) {
    if(`${props.visitedArray[key].Region}` == region){
      count++;

    }else{
      //do nothing
    }

}
return count;
 }

const divStyles = {
  // boxShadow: '1px 1px 1px 1px #8C54FB',
  color: "#8C54FB",

};
  return (
    <>
      <div className="bg-background-main/50 rounded px-3 h-auto sm:w-auto w-[84vw]">
        <h1 className="text-white text-lg mt-2">Statistics</h1>
<div className="  rounded  p-2 "
  >
        <div class="flex justify-between  ">
          <span style={props.filter === "Europe" ? divStyles: {}} class="text-base font-medium text-blue-700 dark:text-white">
            Europe - <span className="text-muted text-xs text-gray-500">{regionVisitedCount('Europe')} visited</span>
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {Math.round((regionVisitedCount('Europe') / 50) * 100) + "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (regionVisitedCount('Europe') / 50) * 100 + "%",
            }}></div>
        </div>
        </div>
        <div className="  rounded  p-2"
       >
        <div class="flex justify-between ">
          <span
          class="text-base font-medium text-blue-700 dark:text-white"
          style={props.filter === "South America" ? divStyles: {}}
          >
            South America - <span  className="text-muted text-xs text-gray-500">{regionVisitedCount('South America')} visited</span>
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {Math.round((regionVisitedCount('South America') / 14) * 100 )+ "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (regionVisitedCount('South America') / 14) * 100 + "%",
            }}></div>
        </div>
      </div>
      <div className="  rounded  p-2"
         >
        <div class="flex justify-between ">
          <span  style={props.filter === "North America" ? divStyles: {}}
          class="text-base font-medium text-blue-700 dark:text-white"

          >
            North America - <span className="text-muted text-xs text-gray-500">{regionVisitedCount('North America')} visited</span>
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {Math.round((regionVisitedCount('North America') / 23) * 100 )+ "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (regionVisitedCount('North America') / 23) * 100 + "%",
            }}></div>
        </div>
      </div>
      <div className="  rounded  p-2"
         >
        <div class="flex justify-between ">
          <span  style={props.filter === "Asia" ? divStyles: {}}
          class="text-base font-medium text-blue-700 dark:text-white"

          >
            Asia - <span className="text-muted text-xs text-gray-500">{regionVisitedCount('Asia')} visited</span>
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {Math.round((regionVisitedCount('Asia') / 44) * 100 )+ "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (regionVisitedCount('Asia') / 44) * 100 + "%",
            }}></div>
        </div>
      </div>
      <div className="  rounded  p-2"
         >
        <div class="flex justify-between ">
          <span  style={props.filter === "Africa" ? divStyles: {}}
          class="text-base font-medium text-blue-700 dark:text-white"

          >
            Africa - <span className="text-muted text-xs text-gray-500">{regionVisitedCount('Africa')} visited</span>
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {Math.round((regionVisitedCount('Africa') / 54) * 100 )+ "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (regionVisitedCount('Africa') / 54) * 100 + "%",
            }}></div>
        </div>
      </div>
      </div>
    </>
  );
};

export default StatisticsComponent;
