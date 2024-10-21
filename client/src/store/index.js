import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./agentsSlice";
import berandaSlice from "./berandaSlice";
import mapsSlice from "./mapsSlice";
import weaponSlice from "./weaponSlice";
import detailAgent from "./detailAgentSlice";

const store = configureStore({
  reducer: {
    agentsReducer,
    berandaSlice,
    mapsSlice,
    weaponSlice,
    detailAgent,
  },
});

export default store;
