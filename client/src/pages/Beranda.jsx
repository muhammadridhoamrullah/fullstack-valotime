import { useEffect, useState } from "react";
import instance from "../axiosInstance";
import BerandaCard from "../components/BerandaCard";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getBeranda } from "../store/berandaSlice";

export default function Beranda() {
  const beranda = useSelector((state) => {
    return state.berandaSlice.data;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeranda());
  }, []);
  return (
    <div className="items-center justify-center min-h-screen bg-gray-900">
      {beranda.map((el, index) => {
        return <BerandaCard key={index} data={el} />;
      })}
    </div>
  );
}
