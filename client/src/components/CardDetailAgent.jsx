import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../axiosInstance";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Cardagents({ agents }) {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [addCoin, setAddCoin] = useState([]);
  // POST /usercoins/:coinId

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Link to={`/agents/${agents.uuid}`}>
        <img
          className="w-full h-auto transform transition duration-300 hover:scale-110"
          src={agents.fullPortraitV2}
          alt="Agent Portrait"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">
          {agents.displayName}
        </div>
        <p className="text-gray-200 text-base mb-2">{agents.description}</p>
        <p className="text-gray-200 text-base font-bold">
          Role : <span>{agents.role.displayName}</span>
        </p>
      </div>
    </div>
  );
}
