import React, { useEffect } from "react";
import axios from "axios";
import instance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Donasi() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.post("/generate-midtrans-token", null, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        const { midtransToken, redirectUrl } = response.data;
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Periksa parameter query dari URL untuk mendapatkan status pembayaran
    const urlParams = new URLSearchParams(window.location.search);
    const statusCode = urlParams.get("status_code");
    const transactionStatus = urlParams.get("transaction_status");

    // Jika pembayaran berhasil (status_code: 200 dan transaction_status: capture), arahkan kembali ke halaman homepage
    if (statusCode === "200" && transactionStatus === "capture") {
      navigate("/"); // Mengalihkan kembali ke halaman homepage
    }
  }, [navigate]);

  return null;
}
