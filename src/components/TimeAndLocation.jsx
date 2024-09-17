import React from 'react'

function TimeAndLocation({ weather: {formattedLocalTime, name} }) {
    return (
        <div>

            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4 my-4 sm:my-6">
                <p className="hidden sm:block text-white text-lg sm:text-xl font-extralight ">
                    {formattedLocalTime}
                </p>
            </div>
            <div className="flex items-center justify-center my-2 sm:my-3">
                <p className="text-white text-2xl sm:text-3xl font-medium">
                    {`${name}`}
                </p>
            </div>
        </div>
    ) 
}

export default TimeAndLocation;