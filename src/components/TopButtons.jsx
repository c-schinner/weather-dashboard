import React from 'react'

function TopButtons({ setLocation }) {

    const cities = [
        {
        id: 1,
        title: 'San Diego',
        coords: { lat: 32.7157, lon: -117.1611 },
    },
    {
        id: 2,
        title: 'San Marcos',
        coords: { lat: 33.1434, lon: -117.1611 },
    },
    {
        id: 3,
        title: 'Denver',
        coords: { lat: 39.7392, lon: -104.9903 },
    },
    {
        id: 4,
        title: 'St. Louis',
        coords: { lat: 38.6270, lon: -90.1994 },
    },
    {
        id: 5,
        title: 'New York',
        coords: { lat: 40.7128, lon: -74.0060 },
    },
]

    return <div className="hidden sm:flex items-center justify-center space-x-4 sm:space-x-6 my-4 mx-2 sm:mx-6">
        {cities.map((city) => (

            <button 
            key={city.id} 
            className="text-white text-sm sm:text-lg font-medium m-2 py-1 px-3 transition ease-in hover:scale-105"
            onClick={() => setLocation(city.title)}>
            {city.title}
            </button>

        ))}
    </div>
}

export default TopButtons