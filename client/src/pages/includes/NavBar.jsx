import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faBars,
  faCircleUser,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import Auth from "../auth/Auth.jsx";
import { logout } from "../../store/authSlice.js";
import SearchBar from "./SearchBar/SearchBar.jsx";

export default function Navbar() {
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.auth);
  const isLoggedIn = !!access;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = (type) => {
    setAuthModal(type);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setAuthModal(null);
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between h-22 px-6 sm:px-12">
          {/* Left Section - Logo */}
          <div className="flex-1 flex items-center justify-start">
            <a
              href="/listings"
              className="flex items-center gap-2 text-red-500 hover:opacity-80 transition-opacity"
            >
              <FontAwesomeIcon icon={faCompass} className="w-10 h-10" />
              <span className="text-2xl font-bold tracking-tight hidden md:block">
                Airbnb
              </span>
            </a>
          </div>

          {/* Center Section - Search Bar */}
          <SearchBar />

          {/* Right Section */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4 relative">
            <a
              href="/listings/new"
              className="hidden lg:block text-gray-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Become a host
            </a>
            <button className="hidden md:block text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
            </button>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 p-2 rounded-full border shadow-sm transition-all duration-200 ease-in-out hover:shadow-md hover:scale-105"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="w-4 h-4 text-gray-700"
              />
              <FontAwesomeIcon
                icon={faCircleUser}
                className="w-6 h-6 text-gray-500"
              />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="py-2" role="menu">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/profile"
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                      <a
                        href="/wishlists"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Wishlists
                      </a>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openAuthModal("signup")}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => openAuthModal("signin")}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log in
                      </button>
                      <hr className="my-1" />
                      <a
                        href="/listings/new"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Become a host
                      </a>
                      <a
                        href="/help"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Help Center
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {authModal && <Auth onClose={closeModal} type={authModal} />}
    </>
  );
}
