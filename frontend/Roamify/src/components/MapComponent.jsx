import React from "react"
import mapImg from '../img/map.png'
const MapComponent = ()=>{
    return(
        <>
       <div class="grid grid-cols-1  gap-4">
              <div className="bg-background-main/50 rounded p-1  px-4 py-5  overflow-auto mb-5 h-[50vh]">
                <img src={mapImg} className="w-full h-full" alt="" />
               
              </div>
             </div>

        </>
    )
}

export default MapComponent;