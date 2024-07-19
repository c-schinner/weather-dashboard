import { DateTime } from "luxon";

const API_KEY = 'f55fd02dd0c725c7742bda4698aa4dd8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';


// There is an issue with this function thats causing an error.
// when i click the top buttons, the "lat" and "lon" properties are undefined. Not sure why.
const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const res = await fetch(url);
    return await res.json();
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

const formatCurrent = (data) => {

    if (!data || !data.coord || !data.main || !data.weather || !data.weather[0] || !data.wind || !data.sys) {
        console.error("Invalid data structure:", data);
        return {};
    }

    console.log(data);
    const { 
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name, dt, sys: { country, sunrise, sunset },
        weather, wind: { speed },
        timezone,
    } = data;

    const { main: details, icon} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        timezone,
        lat,
        lon,
    }
};

const formatForecastWeather = (secs, offset, data) => {
    // hourly
    const hourly = data.filter(f => f.dt > secs)
    .map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0, 5);

    // daily
    const daily = data.filter((f) => f.dt_txt.slice(-8) === '00:00:00')
    .map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }));

    return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
    try {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);

        if (!formattedCurrentWeather.lat || !formattedCurrentWeather.lon) {
            throw new Error("Latitude or Longitude is missing from the formatted current weather data");
        }

        const { dt, lat, lon, timezone } = formattedCurrentWeather;

        const formattedForecastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units })
            .then((d) => formatForecastWeather(dt, timezone, d.list));

        return { ...formattedCurrentWeather, ...formattedForecastWeather };
    } catch (error) {
        console.error("Error fetching and formatting weather data:", error);
        return null;
    }
};

   
export default getFormattedWeatherData;