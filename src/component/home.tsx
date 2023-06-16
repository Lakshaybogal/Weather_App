import axios from "axios";
import { useState } from "react";
import { TiWeatherSunny, TiWeatherNight, TiWeatherShower, TiWeatherStormy } from 'react-icons/ti'
import { BiSearchAlt } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { WiCloudy, WiNightCloudy } from "weather-icons-react";
import './styles.css'

function Home(): JSX.Element {

    const [city, setCity] = useState('India');
    const [location, setlocation] = useState({
        name: "",
        region: "",
        country: ""
    });
    const [current, setCurrent] = useState({
        temp_c: "",
        temp_f: "",
        condition: {
            text: "",
        },
        humidity: "",
        wind_kph: "",
        feelslike_c: "",
        uv: "",
        is_day: 1,
    });
    const [Icons, setICons] = useState(<TiWeatherSunny />);
    const [err, setErr] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getWeather = async (e: any) => {
        e.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: { q: city },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {

            const response = await axios.request(options);
            const data = response.data;
            console.log(data);
            setlocation(data.location);
            setCurrent(data.current);
            getWeatherIcons(data.current.condition.text);

        } catch (error) {
            console.error(error);
            setErr("Check Your Input");
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getLocation(e: any) {

        try {
            navigator.geolocation.getCurrentPosition(showPosition);
            getWeather(e);
        }
        catch (error) {
            setErr("Location Not Working");
        }
    }

    function showPosition(position) {
        setCity(position.coords.latitude + "," + position.coords.longitude);

    }

    function getWeatherIcons(conditon: string) {
        conditon = conditon.toLowerCase();
        if (conditon.match('sunny') || conditon.match('clear')) {
            setICons(<TiWeatherSunny />)
        }
        else if (conditon.match('rain')) {
            setICons(<TiWeatherShower />)
        }
        else if (conditon.match('night')) {
            setICons(<TiWeatherNight />)
        }
        else if (conditon.match('mist') || conditon.match('overcast')) {
            setICons(<WiCloudy />)
        }
        else if (conditon.match('storm')) {
            setICons(<TiWeatherStormy />)
        }
        else if (conditon.match('cloudy')) {
            setICons(<WiNightCloudy />)
        }
    }

    return (
        <section className="card">
            {err !== '' ? <h4>{err}</h4> : <div className="main_Card">
                <h4>{location.name}, {location.region}</h4>

                <div className="displayIcon flex-col">
                    <div className="weatherIcons ">{Icons}</div>
                    <h3 className="tempText">{current.temp_c}&deg;</h3>
                    <h3 className="conditionText">{current.condition.text}{current.is_day === 1 ? <p>Day</p>:<p>Night</p>}</h3>
                </div>
                <div className="weather">
                    <div className="weatherInfo">
                        <h3>{current.feelslike_c}&deg;</h3>
                        <h4>Feel Like</h4>
                    </div>
                    <div className="weatherInfo">
                        <h3>{current.humidity}%</h3>
                        <h4>Humidity</h4>
                    </div>
                    <div className="weatherInfo">
                        <h3>{current.uv}</h3>
                        <h4>UV</h4>
                    </div>
                    <div className="weatherInfo">
                        <h3>{current.wind_kph} KM/H</h3>
                        <h4>Wind Speed</h4>
                    </div>
                </div>
                <form className="input">
                    <button className="location-btn" onClick={(e) => { (getLocation(e)) }}><MdLocationPin /></button>
                    <input type="text" className="input-box" placeholder="City name" name="city" onChange={(e) => { setCity(e.target.value) }} />
                    <button className="input-btn" onClick={getWeather}><BiSearchAlt /></button>
                </form>

            </div>}

        </section>

    )
}

export default Home