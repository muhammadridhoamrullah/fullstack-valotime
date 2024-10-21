import Swal from "sweetalert2";
import instance from "../axiosInstance";

export function OpenAI() {
  return async function () {
    try {
      const res = await instance.post(
        "/openAI",
        { map },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setResponse(res.data.result);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
}
