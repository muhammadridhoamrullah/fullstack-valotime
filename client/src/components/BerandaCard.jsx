import React from "react";

export default function BerandaCard({ data }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md rounded overflow-hidden shadow-lg bg-white">
        <div className="h-64 w-full overflow-hidden">
          <img
            className="object-cover h-full w-full transform transition duration-300 hover:scale-110"
            src={data.imgUrl}
            alt={data.title}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">{data.caption}</p>
          <p className="text-gray-600 text-sm mt-2">By: {data.User.username}</p>
        </div>
      </div>
    </div>
  );
}
