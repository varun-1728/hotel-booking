import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faApple,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

export default function Auth({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch Redux login thunk
      const accessToken = await dispatch(login(formData)).unwrap();
      if (accessToken) {
        alert("Welcome! You are logged in.");
        navigate("/listings");
        onClose();
      }

      // const access = accessToken;
      // const [header, payload, signature] = access.split(".");
      // const decodedPayload = JSON.parse(atob(payload));
      // const userId = decodedPayload.sub;

      // console.log(userId); // This will print the user._id
    } catch (err) {
      console.error(err);
      alert(err?.message || "Login failed. Try again!");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-[100]">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="p-6 border-b flex items-center">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
          <div className="flex-grow text-center">
            <h2 className="text-xl font-semibold">Log in or sign up</h2>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">Welcome to AirBnB</h3>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 pt-6 border rounded-t-lg focus:border-black focus:outline-none transition-colors duration-200 peer relative z-10 bg-transparent"
                required
              />
              <label
                htmlFor="email"
                className="absolute top-4 left-4 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-black peer-valid:text-xs peer-valid:top-2 peer-valid:text-black pointer-events-none"
              >
                Email
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 pt-6 border rounded-b-lg focus:border-black focus:outline-none transition-colors duration-200 peer relative z-10 bg-transparent"
                required
              />
              <label
                htmlFor="password"
                className="absolute top-4 left-4 text-gray-500 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-focus:text-black peer-valid:text-xs peer-valid:top-2 peer-valid:text-black pointer-events-none"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors duration-200"
            >
              Continue
            </button>
          </form>

          {/* Social / alternative login */}
          {/* <div className="flex items-center my-6">
            <hr className="flex-grow border-t" />
            <span className="px-4 text-gray-500 font-semibold text-sm">or</span>
            <hr className="flex-grow border-t" />
          </div> */}

          {/* <div className="flex flex-col gap-4">
            <button className="flex items-center justify-start gap-4 w-full p-4 border rounded-lg hover:border-black transition-colors duration-200">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
              <span className="flex-grow text-center font-medium">
                Continue with Google
              </span>
            </button>
            <button className="flex items-center justify-start gap-4 w-full p-4 border rounded-lg hover:border-black transition-colors duration-200">
              <FontAwesomeIcon icon={faApple} className="w-5 h-5" />
              <span className="flex-grow text-center font-medium">
                Continue with Apple
              </span>
            </button>
            <button className="flex items-center justify-start gap-4 w-full p-4 border rounded-lg hover:border-black transition-colors duration-200">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
              <span className="flex-grow text-center font-medium">
                Continue with email
              </span>
            </button>
            <button className="flex items-center justify-start gap-4 w-full p-4 border rounded-lg hover:border-black transition-colors duration-200">
              <FontAwesomeIcon
                icon={faFacebook}
                className="w-5 h-5 text-blue-600"
              />
              <span className="flex-grow text-center font-medium">
                Continue with Facebook
              </span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
