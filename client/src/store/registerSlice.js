import Swal from "sweetalert2";
import instance from "../axiosInstance";

export function registerSlice(regisForm, navigate) {
  return async function () {
    try {
      const { data } = await instance.post("/register", regisForm);

      Swal.fire({
        title: "Good job!",
        text: "You success to register!",
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}
