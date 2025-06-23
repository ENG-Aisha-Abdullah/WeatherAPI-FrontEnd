import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Home: React.FC =() => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState("");
  const [history, setHistory] = useState("");

  const token = localStorage.getItem("accessToken");

  const getWeather = async () => {
    if (!lat) {
      Swal.fire("Please Enter Latitude Number");
      return;
    }
    if (!lon) {
      Swal.fire("Please Enter Longitude Number");
      return;
    }

    try {
      const res = await axios.get(`https://weatherapi-backend-d1qq.onrender.com/weather?lat=${lat}&lon=${lon}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWeather(res.data);

    } catch (err) {
      console.error(err);
      Swal.fire("Failed to get weather data");
    }
  };

  const getHistory = async () => {
    try {
      const res = await axios.get("https://weatherapi-backend-d1qq.onrender.com/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to get history data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 ">
      <h1 className="text-2xl font-bold mb-4">Check Weather</h1>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={getWeather}
          className="font-bold bg-blue-700 text-gray-100 px-4 py-2 rounded hover:text-white hover:bg-blue-800 cursor-pointer"
        >
          Get Weather
        </button>
        <button
          onClick={getHistory}
          className="font-bold px-4 py-2 text-gray-100 bg-gray-600 rounded hover:text-gray-50 hover:bg-gray-700 cursor-pointer"
        >
          Get History
        </button>
      </div>
   {weather && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md mb-6">
          <p><strong>Temperature:</strong> {}</p>
          <p><strong>Humidity:</strong> {}</p>
          <p><strong>Description:</strong> {}</p>
          {/* <p><strong>Source:</strong> {}</p> */}
          <p className="text-sm text-gray-500 mt-2">
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-xl bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Weather History</h2>
          {/* {history.map((index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p><strong>Lat:</strong> {}</p>
              <p><strong>Lon:</strong> {}</p>
              <p><strong>Temp:</strong> {}</p>
              <p><strong>Description:</strong> {}</p>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}

export default Home;
