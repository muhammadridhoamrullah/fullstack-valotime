import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Agents from "./pages/Agents";
import Layout from "./components/Layout";
import OpenAIforMap from "./pages/OpenAIforMap";
import Donasi from "./pages/Donasi";
import Posting from "./pages/Posting";
import Beranda from "./pages/Beranda";
import Maps from "./pages/Maps";
import Weapons from "./pages/Weapons";
import DetailAgent from "./pages/DetailAgent";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <Beranda />,
      },
      {
        path: "agents",
        element: <Agents />,
      },
      {
        path: "agents/:uuid",
        element: <DetailAgent />,
      },
      {
        path: "tanyaStrategi",
        element: <OpenAIforMap />,
      },
      {
        path: "donasi",
        element: <Donasi />,
      },
      {
        path: "/posting",
        element: <Posting />,
      },
      {
        path: "/maps",
        element: <Maps />,
      },
      {
        path: "/weapons",
        element: <Weapons />,
      },
    ],
  },
]);

export default router;
