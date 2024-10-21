import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../axiosInstance";
import Swal from "sweetalert2";
import { useState } from "react";

export default function CardWeapon({ weap }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Link to={`/weap/${weap.uuid}`}>
        <img
          className="w-full h-auto transform transition duration-300 hover:scale-110"
          src={weap.displayIcon}
          alt="Weapon Portrait"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">
          {weap.displayName}
        </div>
        <p className="text-gray-300 text-base">
          {weap.category.EEquippableCategory}
        </p>
      </div>
    </div>
  );
}
