import React from "react";

const StatisticsComponent = (props) => {
  const europeProgress = props.progress;

  return (
    <>
      <div className="bg-background-main/50 rounded p-3 h-auto">
        <h1 className="text-white text-lg">Statistics</h1>

        <div class="flex justify-between mb-1 my-3">
          <span class="text-base font-medium text-blue-700 dark:text-white">
            Europe
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {(europeProgress / 50) * 100 + "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (europeProgress / 50) * 100 + "%",
            }}></div>
        </div>
        <div class="flex justify-between mb-1 my-3">
          <span class="text-base font-medium text-blue-700 dark:text-white">
            South America
          </span>
          <span class="text-sm font-medium text-blue-700 dark:text-white">
            {(europeProgress / 50) * 100 + "%"}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            class="bg-purple-main h-2.5 rounded-full"
            style={{
              width: (europeProgress / 50) * 100 + "%",
            }}></div>
        </div>
      </div>
    </>
  );
};

export default StatisticsComponent;
