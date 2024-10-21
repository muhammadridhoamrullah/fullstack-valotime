import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../axiosInstance";
import Swal from "sweetalert2";
import { useState } from "react";

export default function CardMap({ mapVal }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Link to={`/mapVal/${mapVal.uuid}`}>
        <img
          className="w-full h-auto transform transition duration-300 hover:scale-110"
          src={mapVal.splash}
          alt="Map Portrait"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">
          {mapVal.displayName}
        </div>
        <p className="text-gray-300 text-base">{mapVal.coordinates}</p>
      </div>
    </div>
  );
}
