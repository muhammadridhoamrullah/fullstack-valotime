import { useState } from "react";
import Swal from "sweetalert2";
import instance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postingSlice } from "../store/postingSlice";

export default function Posting() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [posting, setPosting] = useState({
    imgUrl: "",
    title: "",
    caption: "",
    tag: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setPosting({
      ...posting,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(postingSlice(posting, navigate));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Post Something
        </h2>
        <form onSubmit={submitHandler}>
          <div className="">
            <label
              htmlFor="imgUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image Url
            </label>
            <input
              type="text"
              id="imgUrl"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="imgUrl"
              value={posting.imgUrl}
              onChange={changeHandler}
            />
          </div>
          <span className="text-gray-500">
            ingin upload foto sendiri? kunjungi{" "}
            <Link className="text-blue-500" to={"https://imgur.com/upload"}>
              Link ini
            </Link>
          </span>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="title"
              value={posting.title}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700"
            >
              Caption
            </label>
            <input
              type="text"
              id="caption"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="caption"
              value={posting.caption}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="tag"
              value={posting.tag}
              onChange={changeHandler}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// imgUrl, title, caption, tag
