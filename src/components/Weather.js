import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [res,setRes]=useState({})
    const [degrees,setDegrees]=useState(true)
    const succes = (pos)=>{
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcba4d5765055800be2e8a95a8c9f4b4`)
        .then((e)=>{
            setRes(e.data);
        })
    }
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(succes);
    },[])

    return (
        <div>
            <div className='weather-card'>
                <h2>Weather App</h2>
                <h3>{`${res.name}, ${res.sys?.country}`}</h3>
                <div className='grid-container'>
                    {(res.weather?.[0].icon===undefined)? <p>Caragando...</p> : <img className='weather-icon' src={`http://openweathermap.org/img/wn/${res.weather?.[0].icon}@2x.png`} alt=''></img>}
                    <ul className='weather-ul'>
                        <li className='weather-li weather-description'><b>{`'${res.weather?.[0].description}'`}</b></li>
                        <li className='weather-li'><i className="fa-solid fa-wind"></i><b> Wind speed:</b>{` ${res.wind?.speed} m/s`}</li>
                        <li className='weather-li'><i className="fa-solid fa-cloud"></i><b> Clouds:</b>{` ${res.clouds?.all} %`}</li>
                        <li className='weather-li'><i className="fa-solid fa-temperature-half"></i><b> Pressure:</b>{` ${res.main?.pressure} mb`}</li>
                    </ul>
                    {degrees? <p className='weather-temp'>{`${(res.main?.temp -  273.15).toFixed(0)}  °C`}</p> : <p className='weather-temp'>{`${((res.main?.temp -  273.15)*(9/5)+32).toFixed(0)}  °F`}</p> }
                    {degrees?<p>{`Feels like: ${(res.main?.feels_like -  273.15).toFixed(0)} °C`}</p> : <p>{`Feels like: ${((res.main?.feels_like -  273.15)*(9/5)+32).toFixed(0)}  °F`}</p> }
                </div>
                <button onClick={()=>{setDegrees(!degrees)}}>{degrees?"degrees °F":"degrees °C"}</button>
            </div>
        </div>
    );
};

export default Weather;