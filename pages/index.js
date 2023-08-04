import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import Layout from '../components/Layout/layout';
import Weather from './weather';
import chuttersnap from "../public/images/top.jpg";
import { useState } from "react";
import stylesTwo from '../components/Layout/layout.module.css';
export default function Home() {
  const [cityQuery, setCityQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataSport, setweatherDataSport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //console.log ("Test", cityQuery)
  
  //const url = `https://wttr.in/${cityQuery}?format=j1`;
  //const url = `https://api.weatherapi.com/v1/sports.json?key=5727d276094e445abc2171520230108&q=${cityQuery}&aqi=no`
  const url = `https://api.weatherapi.com/v1/current.json?key=5727d276094e445abc2171520230108&q=${cityQuery}&aqi=no`
  const urlSport= `http://api.weatherapi.com/v1/sports.json?key=5727d276094e445abc2171520230108&q=${cityQuery}&aqi=no`
  
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      console.log(url)
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data);

      const resTwo= await fetch(urlSport)
      const dataTwo = await resTwo.json();
      setweatherDataSport(dataTwo);
      //console.log('------',dataTwo.football);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const onQueryChange = (e) => {
    const value = e.target.value;
    setCityQuery(value);
    console.log('value', value)
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };
  return (
    <Layout>
      <div >
        <Head>
          <title>App de clima</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="card" style={{background: '#ffffff7a'}} >
                    <div className="card-header text-center">
                      <br />
                        <h2 style={{
                          color: 'black'
                        }}>Ingresa una ciudad</h2>
                        <br />
                    </div>
                    <div className="card-body">
                        <div class="form-row" style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          }}>
                          <div class="form-group col-md-6">
                            <input
                                
                                placeholder="Ciudad"
                                value={cityQuery}
                                onChange={onQueryChange}
                                onKeyDown={handleKeyDown}
                                class="form-control form-control-md mb-1 "
                            />
                          </div>
                          <div class="form-group col-md-3">
                            <button
                              class="btn btn-primary mb-2"
                              onClick={fetchWeather}
                            >
                              Buscar
                            </button>
                          </div>
                        </div>
                    </div>
                    <div class="card-footer text-body-secondary">
                        <div style={{ marginTop: "6px", display: "flex", justifyContent: "center" }}>
                          {/* {{weatherData}} */}
                          {weatherData ? (
                            <div>
                              <h4 style= {{
                                color: "black",
                              }}>
                                El clima actual en: {weatherData.location.name}
                              </h4>
                              &nbsp;
                              <ul style={{
                                color: "black",
                              }}>
                                <li>
                                  Temperatura: {weatherData.current.temp_c} °C /{" "}
                                  {weatherData.current.temp_f} F
                                </li>
                                
                                <li>
                                  Condiciones:{" "}
                                  {weatherData.current.condition.text}
                                </li>
                              </ul>
                            </div>
                          ):null}
                      </div>
                      {/* <h4>
                        {weatherDataSport.football.stadium}
                      </h4> */}
                      {/* <div>
                      <h1>Tabla de Datos</h1>
                      <table>
                        <thead>
                          <tr>
                            <th>Equipos</th>
                            <th>Inicio</th>
                            <th>País</th>
                            <th>Torneo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weatherDataSport.map((item) => (
                            <tr key={item.match}>
                              <td>{item.match}</td>
                              <td>{item.start}</td>
                              <td>{item.country}</td>
                              <td>{item.tournament}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div> */}
                    </div>
                </div>
        <Image
          src={chuttersnap}
          alt="Photo by CHUTTERSNAP on Unsplash"
          fill
          placeholder="blur"
          style={{ "z-index": "-1", objectFit: "cover" }}
        />
         {/*  <div style={{ marginTop: "6px", display: "flex", justifyContent: "center" }}>
            {{weatherData}}
            {weatherData ? (
              <div>
                <h4 style= {{
                  color: "white",
                }}>
                  Clima actual {weatherData.current.temp_c} °C
                </h4>
                <ul>
                  <li>
                    Temperature: {weatherData.current_condition[0].temp_C}C /{" "}
                    {weatherData.current_condition[0].temp_F}F
                  </li>
                  <li>
                    Conditions:{" "}
                    {weatherData.current_condition[0].weatherDesc[0].value}
                  </li>
                </ul>
              </div>
            ):null}
        </div> */}
      </div>
    </Layout>
  )
}
