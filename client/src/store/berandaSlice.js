import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import instance from "../axiosInstance";

const berandaSlice = createSlice({
  name: "beranda",
  initialState: {
    data: [],
  },
  reducers: {
    fetchBeranda: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchBeranda } = berandaSlice.actions;

export function getBeranda() {
  return async function (dispatch, getState) {
    try {
      const { data } = await instance.get("/beranda", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchBeranda(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}
export default berandaSlice.reducer;
