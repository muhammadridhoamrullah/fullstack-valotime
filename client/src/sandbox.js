import { createSlice, configureStore } from "@reduxjs/toolkit";

const agentSlice = createSlice({
  name: "agents",
  initialState: {
    data: [],
  },
  reducers: {
    fetchData: (state, payload) => {
      return {...state, data: state.datanpm };
    },
  },
});

export const { fetchData } = agentSlice.actions;

const store = configureStore({
  reducer: agentSlice.reducer,
});

store.dispatch(fetchData());
