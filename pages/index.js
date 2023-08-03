import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image'
import Layout from '../components/Layout/layout';
import Weather from './weather';
import chuttersnap from "../public/images/chuttersnap--gS54SWrHMg-unsplash.jpg";
import { useState } from "react";
export default function Home() {
  const [cityQuery, setCityQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log ("Test", weatherData)

  //const url = `https://wttr.in/${cityQuery}?format=j1`;
  const url = `https://api.weatherapi.com/v1/sports.json?key=5727d276094e445abc2171520230108&q=${cityQuery}&aqi=no`
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeatherData(data.football);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const onQueryChange = (e) => {
    const value = e.target.value;
    setCityQuery(value);
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
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h2 style={{ textAlign: "center" }}>What's The Weather Like?</h2>
        <div
          style={{ marginTop: "6px", display: "flex", justifyContent: "center" }}
        >
          <input
            placeholder="City name"
            value={cityQuery}
            onChange={onQueryChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={fetchWeather}
            style={{ padding: "2px", marginLeft: "2px" }}
          >
            Search
          </button>
        </div>
        <Image
          src={chuttersnap}
          alt="Photo by CHUTTERSNAP on Unsplash"
          fill
          placeholder="blur"
          style={{ "z-index": "-1", objectFit: "cover" }}
        />
      </div>
    </Layout>
  )
}
