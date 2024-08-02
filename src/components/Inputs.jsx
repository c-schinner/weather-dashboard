import React from 'react'
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi'; 

function Inputs({ setLocation, setUnits }) {

    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        if (city !== '') setLocation(city);
        setCity('');
    };

  return (

    <div className="flex flex-row justify-center my-6">
        
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">

            <input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text" 
            placeholder="Search for city..."
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"/>

            <BiSearch 
            size={30} 
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleSearchClick}/>
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">

        <button 
        name="metric" 
        className="text-2xl text-white font-light transition ease-out hover:scale-125"
        onClick={()=> setUnits('metric')}>
        °C
        </button>

        <p className="text-2xl text-white mx-1">|</p>

        <button 
        name="imperial" 
        className="text-2xl text-white font-light transition ease-out hover:scale-125"
        onClick={() => setUnits('imperial')}>
        °F
        </button>

        </div>

    </div>
  
)
}

export default Inputs;