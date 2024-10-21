import React, { useState } from "react";
import instance from "../axiosInstance";
import OpenAIResultCard from "../components/CardForQnAMap";

export default function OpenAIChat() {
  const [map, setMap] = useState("");
  const [response, setResponse] = useState(null);

  const maps = [
    "Ascent",
    "Bind",
    "Haven",
    "Split",
    "Icebox",
    "Breeze",
    "Fracture",
    "Pearl",
    "Lotus",
    "Sunset",
  ];

  const fetchOpenAIResponse = async () => {
    try {
      const res = await instance.post(
        "/openAI",
        { map },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-900">
      <div className="mx-auto px-4 py-8 bg-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Tanya OpenAI strategi untuk map yang dipilih
        </h1>
        <div className="mb-4">
          <label htmlFor="mapInput" className="block mb-2 text-white">
            Pilih nama map:
          </label>
          <select
            id="mapInput"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          >
            <option className="text-gray-900" value="">
              Pilih map...
            </option>
            {maps.map((mapName) => (
              <option key={mapName} value={mapName}>
                {mapName}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchOpenAIResponse}
          className="bg-white text-md text-gray-900 px-4 py-2 rounded-md"
        >
          Kirim
        </button>
        <div className="mt-8 flex justify-center">
          {response && <OpenAIResultCard result={response} />}
        </div>
      </div>
    </div>
  );
}
