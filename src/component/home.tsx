import axios from "axios"
import { useState } from "react";
import { TiWeatherSunny, TiWeatherNight, TiWeatherShower, TiWeatherStormy } from 'react-icons/ti'
import { BiSearchAlt } from 'react-icons/bi';
import { WiCloudy, WiNightCloudy } from "weather-icons-react"
import './styles.css'

function Home(): JSX.Element {

    const [city, setCity] = useState('jammu');
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
    });
    const [Icons, setICons] = useState(<TiWeatherSunny />)
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
            setErr("404 Error")
        }
    }
    // useEffect(() => {
    //     getWeather(city);
    // },[]);

    function getWeatherIcons(conditon: string) {
        conditon = conditon.toLowerCase();
        if (conditon.match('sunny')) {
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
            <div className="main_Card">
                <div>{location.name === '' ? <h4>Swankha, Jammu and Kashmir</h4> : <h4>{location.name}, {location.region}</h4>} </div>
                {err !== '' && <h4>{err}</h4>}
                <div className="displayIcon flex-col">
                    <div className="weatherIcons ">{Icons}</div>
                    <h3>{current.temp_c}&deg;</h3>
                    <h3>{current.condition.text}</h3>
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
                    <input type="text" className="input-box" placeholder="City name" name="city" onChange={(e) => { setCity(e.target.value) }} />
                    <button className="input-btn" onClick={getWeather}><BiSearchAlt /></button>
                </form>
            </div>

        </section>
    )
}

export default Home