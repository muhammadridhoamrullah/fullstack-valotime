import React from "react";

export default function OpenAIResultCard({ result }) {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">
          Map: {result.map}
        </div>

        <p className="font-bold text-xl text-gray-900">Komposisi Agent:</p>
        <p className="text-gray-700 text-base mb-2">{result.agentKomposisi}</p>
        <p className="font-bold text-xl text-gray-900">Alasan:</p>
        <p className="text-gray-700 text-base mb-2">{result.alasan}</p>
        <p className="font-bold text-xl text-gray-900">
          Persentase untuk Menang:
        </p>
        <p className="text-gray-700 text-base mb-2">
          {result.persentaseUntukMenang}
        </p>
        <p className="font-bold text-xl text-gray-900">
          Kenapa persentasenya segitu?
        </p>
        <p className="text-gray-700 text-base">
          {result.alasanPersentaseSegitu}
        </p>
      </div>
    </div>
  );
}
