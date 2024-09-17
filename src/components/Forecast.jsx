import React from 'react'

function Forecast({ title, data }) {


    return (
        <div className="my-6 px-2">

            <div className="flex items-center justify-start mb-2 ">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2"></hr>

            <div className="flex flex-row items-center justify-between text-white overflow-x-auto whitespace-nowrap">

                {data.map((d, index) => (
                    <div key={index} 
                    className="flex flex-col items-center mx-2 p-2 min-w-[120px]">
                        <p className="font-light text-sm text-center">{d.title}</p>
                        <img 
                        src={d.icon}
                        alt="weather icon"
                        className="w-12 h-12 my-1" />
                        <p className="font-medium text-lg">{`${d.temp.toFixed()}°`}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Forecast;