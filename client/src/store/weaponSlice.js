import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import instance from "../axiosInstance";

const weaponSlice = createSlice({
  name: "weapon",
  initialState: {
    data: [],
  },
  reducers: {
    fetchWeapon: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchWeapon } = weaponSlice.actions;

export function getWeapons() {
  return async function (dispatch) {
    try {
      const { data } = await instance.get("/weapons", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchWeapon(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}

export default weaponSlice.reducer;
