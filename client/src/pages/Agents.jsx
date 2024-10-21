import { useEffect, useState } from "react";
import instance from "../axiosInstance";
import Card from "../components/Card";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAgents } from "../store/agentsSlice";

export default function Agents() {
  
  // const [agents, setAgents] = useState([]);
  const agent = useSelector((state) => {
    return state.agentsReducer.data;
  });
  //untuk mengambil data
  // AGENT INI NNTI UNTUK DILETAKKAN DI BODYNYA

  const dispatch = useDispatch();
  // untuk mentrigger actions nya

  useEffect(() => {
    dispatch(getAgents());
  }, []);

  return (
    <div className="bg-gray-900 mx-auto p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {agent.map((el) => (
          <Card key={el.uuid} agents={el} />
        ))}
      </div>
    </div>
  );
}
