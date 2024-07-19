
import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [query, setQuery] = useState({q:'san diego'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {

    const message = query.q ? query.q : 'current location';
    toast.info(`Fetching weather data for ${message.toUpperCase()}`);

    await getFormattedWeatherData({ ...query, units }).then((data) => {

      toast.success(`Data fetch Successful for ${data.name}, ${data.country}`);

      setWeather(data)
    });
  };

  // says react hook is missing a dependency??
  useEffect(() => { 
    getWeather(); 
  }, [query, units]);


  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 20 : 60; 
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
    return 'from-yellow-600 to-orange-700';
  }

  return (
    <div className={`mx-auto max-w-screen-md md-4 py-5 px-32 
    bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      
      {weather && (
        <div>
        <TimeAndLocation weather={weather} />
        <TemperatureAndDetails weather={weather} units={units}/>

        <Forecast title="3 hour forecast" data={weather.hourly} />
        <Forecast title="daily forecast" data={weather.daily} />
      </div>
      )}
      
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
