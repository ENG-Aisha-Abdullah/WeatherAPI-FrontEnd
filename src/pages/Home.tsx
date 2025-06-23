import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

interface WeatherData {
  source: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  tempC: number;
  humidity: number;
  description: string;
  fetchedAt: string;
}

interface HistoryItem {
  lat: number;
  lon: number;
  requestedAt: string;
  weather: {
    city: string;
    source: string;
    tempC: number;
    description: string;
  };
}

const Home: React.FC = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const handleLogout = () => {
    localStorage.removeItem("Token");
    Swal.fire("Logged out successfully").then(() => {
      navigate("/"); 
    });
  };

  const getWeather = async () => {
    if (!lat || !lon) {
      Swal.fire("Please enter both Latitude and Longitude");
      return;
    }
    if (!token) {
      Swal.fire("Token not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.get(
        `https://weatherapi-backend-d1qq.onrender.com/weather?lat=${lat}&lon=${lon}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeather(res.data);
    } catch (err: any) {
      console.error("Weather error:", err.response?.data || err.message);
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="self-end w-full max-w-xl flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="font-bold bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
        >
          Log Out
        </button>
      </div>

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
          className="font-bold bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
        >
          Get Weather
        </button>
        <button
          onClick={getHistory}
          className="font-bold bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
        >
          Get History
        </button>
      </div>

      {weather && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md mb-6">
          <p><strong>Latitude:</strong> {weather.coordinates.lat}</p>
          <p><strong>Longitude:</strong> {weather.coordinates.lon}</p>
          <p><strong>Temperature:</strong> {weather.tempC} °C</p>
          <p><strong>Humidity:</strong> {weather.humidity} %</p>
          <p><strong>Description:</strong> {weather.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Source:</strong> {weather.source} —{" "}
            <strong>Fetched at:</strong> {new Date(weather.fetchedAt).toLocaleString()}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-xl bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Weather History</h2>
          {history.map((item, index) => (
      <div key={index} className="border-b border-gray-200 py-2">
        <p><strong>Lat:</strong> {item.lat}</p>
        <p><strong>Lon:</strong> {item.lon}</p>
        <p><strong>Temp:</strong> {item.weather.tempC} °C</p>
        <p><strong>Description:</strong> {item.weather.description}</p>
        <p><strong>Source:</strong> {item.weather.source}</p>
        <p className="text-sm text-gray-500">
          Requested at: {new Date(item.requestedAt).toLocaleString()}
        </p>
      </div>
    ))}
        </div>
      )}
    </div>
  );
};

export default Home;
