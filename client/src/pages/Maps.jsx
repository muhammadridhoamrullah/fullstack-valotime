import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapsSlice, { getMaps } from "../store/mapsSlice";
import CardMap from "../components/CardMap";

export default function Maps() {
  const maps = useSelector((state) => {
    return state.mapsSlice.data;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaps());
  }, []);

  return (
    <div className="bg-gray-900 mx-auto p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {maps.map((el) => (
          <CardMap key={el.uuid} mapVal={el} />
        ))}
      </div>
    </div>
  );
}
