import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const Info = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [userCity, setUserCity] = useState(null);
    const [weatherData, setWeatherData] = useState(null);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        const city = data.address.city;
                        setUserCity(city);
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0bbcd0660412071007c65d9204e4218a&units=metric`)
                            .then(response => response.json())
                            .then(weather => {
                                setWeatherData(weather);
                            })
                            .catch(error => {
                                console.error('Error al obtener datos del clima:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error al obtener la ubicación:', error);
                    });
            });
        } else {
            console.error('Geolocalización no está disponible en tu navegador.');
        }
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const formattedDateTime = currentDateTime.toLocaleString();

    return (
        <div className='w-full flex flex-col justify-start items-start mt-8 mb-4 pb-8'>
            <h1 className='text-blue200 text-[40px]'>Info</h1>
            <div className='flex flex-row items-start justify-center'>
                <h1 className='text-[20px] text-blue500'>Cuenta: </h1>
                <h1 className='text-[20px] text-blue300 ml-2'>{decodedToken.email}</h1>
            </div>
            {userCity && <h1 className='text-[20px] text-blue500'>Ciudad de {userCity}</h1>}
            <h1 className='text-[20px] text-blue500'>{formattedDateTime}</h1>
            {weatherData && (
                <h1 className='text-[20px] text-blue500 text-left'>El clima presenta una temperatura de <span className='text-blue200'>{weatherData.main.temp}°C</span>, con maximas de <span className='text-blue200'>{weatherData.main.temp_max}°C</span> y minimas de <span className='text-blue200'>{weatherData.main.temp_min}°C</span> y una humedad de <span className='text-blue200'>{weatherData.main.humidity}%</span></h1>
            )}
        </div>
    )
}

export default Info