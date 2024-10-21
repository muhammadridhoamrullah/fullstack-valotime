import { useEffect, useState } from "react";
import instance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSlice } from "../store/loginSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginSlice(loginForm, navigate));
  };

  async function handleCredentialResponse(response) {
    try {
      // let res = await axios({
      //   method: "POST",
      //   url: "http://localhost:3000",
      // });
      // let res = await instance.post("/login-google", null, {
      //   headers: {
      //     google_token: response.credential,
      //   },
      // });
      // console.log("Encoded JWT ID token: " + response.credential);

      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login-google",
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.access_token = data.access_token;

      navigate("/");
      // console.log(res);
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: error.response.data.message,
      // });
      console.log(error);
    }
    // console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {
    function googleLogin() {
      google.accounts.id.initialize({
        client_id:
          "28334895544-6t6e1f85usgd5lkjfhldh3oofcan65ml.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
    googleLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="email"
              value={loginForm.email}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="password"
              value={loginForm.password}
              onChange={changeHandler}
            />
          </div>

          <button
            type="submit"
            className="mb-2 w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div id="buttonDiv"></div>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
