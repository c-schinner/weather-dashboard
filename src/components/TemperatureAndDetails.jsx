import React from 'react'
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { GiSunrise, GiSunset } from'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

const TemeratureAndDetails = ({ 
  weather: {
    temp, 
    feels_like, 
    temp_min, 
    temp_max, 
    humidity, 
    sunset, 
    sunrise, 
    speed, 
    icon, 
    details,
  }, units, 
}) => {

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === 'metric' ? 'km/h' : 'mph'}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    }
  ];

  return (
    <div className="space-y-1 sm:space-y-6">

        <div className="flex items-center justify-center text-lg sm:text-xl text-cyan-300">
            <p>{details}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-white space-y-1 sm:space-y-0">
            <img src={icon} 
            alt="Weather Icon" 
            className="w-16 sm:w-20"/>
            <p className="text-4xl sm:text-5xl">{`${temp.toFixed()}°`}</p>

          <div className="flex flex-col space-y-2 items-start">
            {
              verticalDetails.map(({ id, Icon, title, value }) => (
                <div key={id} className="hidden sm:flex font-light text-sm sm:text-base items-center justify-start">
                  <Icon size={16} className="mr-1" />
                  {`${title}: `}
                  <span className="font-medium ml-1">{value}</span>
                </div>
              ))
            }
          </div>     
        </div>

    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-10 text-white text-sm py-3">
      <div className="hidden sm:flex flex-row items-center space-x-2">

              {
                horizontalDetails.map(({ id, Icon, title, value }) => (
                  <div key={id} className="flex flex-row items-center space-x-2">
                    <Icon size={30} />
                    <p className="font-light">
                      {`${title}: `}
                    <span className="font-medium ml-1">{value}</span>
                    </p>
                  </div>
                ))
              }

      </div>
    </div>
  </div>
  )
}

export default TemeratureAndDetails;