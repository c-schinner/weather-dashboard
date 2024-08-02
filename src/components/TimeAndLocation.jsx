import React from 'react'

function TimeAndLocation({ weather: {formattedLocalTime, name} }) {
  return (
    <div>

        <div className="flex items-center justify-center my-6">
            <p className="text-white text-xl font-extralight ">
                {formattedLocalTime}
            </p>
        </div>

        <div className="flex items-center justify-center my-3">
            <p className="text-white text-3xl font-medium">
                {`${name}`}
            </p>
        </div>

    </div>
  ) 
}

export default TimeAndLocation;