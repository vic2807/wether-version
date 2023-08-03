import { useState } from "react";
import Layout from "../components/Layout/layout";
import Image from "next/image";
import chuttersnap from "../public/images/chuttersnap--gS54SWrHMg-unsplash.jpg";

export default function Weather({ data }) {
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
      {/* <div
        style={{ marginTop: "6px", display: "flex", justifyContent: "center" }}
      >
        {weatherData ? (
          <div>
            <h3>
              Current weather in {weatherData.nearest_area[0].areaName[0].value}
            </h3>
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
        ) : null}
      </div> */}
    </Layout>
  );
}
