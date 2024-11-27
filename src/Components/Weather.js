import React, { useEffect , useRef, useState} from 'react'
import search_icon from '../assets/search.png'
import '../Components/weather.css'
import humidityIcon from '../assets/humidity.png'
import windSpeedIcon from '../assets/wind speed.png'
import clearSkyDay from '../assets/clearSkyDay.png'
import storm from '../assets/storm.png'
import fewClouds from '../assets/fewClouds.png'
import clearSkyNight from '../assets/clearSkyNight.png'
import fewCloudsNight from '../assets/fewCloudsNight.png'
import rainShowerDay from '../assets/showerRain.png'
import rainShowerNight from '../assets/showerRain.png'
import rainDay from '../assets/rainDay.png'
import rainNight from '../assets/rainNight.png'
import snow from '../assets/snow.png'
import mist from '../assets/mist.png'
import scattered from "../assets/scattered.png"
import brokenClouds from "../assets/brokenClouds.png"






const Weather = () => {
  const inputRef = useRef();
  const [weatherData , setWeatherData] = useState(false);

  const allIcons = {
    "01d":clearSkyDay,
    "01n":clearSkyNight,
    "02d":fewClouds,
    "02n":fewCloudsNight,
    "03d":scattered,
    "03n":scattered,
    "04d":brokenClouds,
    "04n":brokenClouds,
    "09d":rainShowerDay,
    "09n":rainShowerNight,
    "10d":rainDay,
    "10n":rainNight,
    "11d":storm,
    "11n":storm,
    "13d":snow,
    "13n":snow,
    "50d":mist,
  }
  const search = async (city)=>{
    if(city === ""){
      alert("Please Enter City Name");
      return ;
    }

    try{
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=999cc66c5d2c6233e26d0979c0ae1f08&units=metric`

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return ;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] ||clearSkyDay;
      setWeatherData({
        humidity : data.main.humidity,
        windSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon : icon,
      })
    }catch(error){
      setWeatherData(false);
      console.error("Error while fetching data");
    }
  }

  useEffect(( )=>{
    search("London");
  },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<><img className='weatherImage' src={weatherData.icon} alt="" />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
          <img className='humidityIcon'src={humidityIcon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
          </div>
          <div className="col">
          <img className='windSpeedIcon' src={windSpeedIcon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
          </div>
        </div> 
        </>:<></>}
        
    </div>
  )
}

export default Weather