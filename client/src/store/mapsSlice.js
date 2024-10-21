import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";
import Swal from "sweetalert2";

const mapsSlice = createSlice({
  name: "maps",
  initialState: {
    data: [],
  },
  reducers: {
    fetchMap: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchMap } = mapsSlice.actions;

export function getMaps() {
  return async function (dispatch) {
    try {
      const { data } = await instance.get("/maps", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchMap(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}

export default mapsSlice.reducer;
