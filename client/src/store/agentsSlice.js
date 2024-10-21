import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";
import Swal from "sweetalert2";

const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    data: [],
  },
  reducers: {
    fetchAgents: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchAgents } = agentsSlice.actions;

export function getAgents() {
  return async function (dispatch, getState) {
    try {
      const { data } = await instance.get("/agents", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchAgents(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}

export default agentsSlice.reducer;
