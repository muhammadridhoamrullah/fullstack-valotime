import Swal from "sweetalert2";
import instance from "../axiosInstance";

export function postingSlice(posting, navigate) {
  return async function () {
    try {
      const { data } = await instance.post("/posting", posting, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Swal.fire({
        title: "Good job!",
        text: "You success to post something!",
        icon: "success",
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}
