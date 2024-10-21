import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeapons } from "../store/weaponSlice";
import CardWeapon from "../components/CardWeapon";

export default function Weapons() {
  const weapons = useSelector((state) => {
    return state.weaponSlice.data;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeapons());
  }, []);

  return (
    <div className="bg-gray-900 mx-auto p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weapons.map((el) => (
          <CardWeapon key={el.uuid} weap={el} />
        ))}
      </div>
    </div>
  );
}
