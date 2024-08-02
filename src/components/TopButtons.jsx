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

  return <div className="flex items-center justify-around my-6">
    {cities.map((city) => (

        <button 
        key={city.id} 
        className="text-white text-lg font-medium transition ease-in hover:scale-75"
        onClick={() => setLocation(city.title)}>
        {city.title}
        </button>

    ))}
  </div>
}

export default TopButtons