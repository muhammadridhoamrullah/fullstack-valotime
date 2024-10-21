import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import instance from "../axiosInstance";

const detailAgentsSlice = createSlice({
  name: "detailAgent",
  initialState: {
    data: [],
  },
  reducers: {
    fetchDetail: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchDetail } = detailAgentsSlice.actions;

export function getDetailAgents(uuid) {
  return async function (dispatch) {
    try {
      const { data } = await instance.get(`agents/${uuid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchDetail([data])); // Ensure data is wrapped in an array
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}

export default detailAgentsSlice.reducer;
