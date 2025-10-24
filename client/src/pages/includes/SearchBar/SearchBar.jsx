import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAllListings } from "../../../api/listingApi";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    const fetchListingsData = async () => {
      try {
        const data = await fetchAllListings();
        setAllListings(data.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListingsData();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allListings.filter((listing) =>
        listing.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setQuery("");
      setSelectedIndex(-1);
    }
  }, [query, allListings]);

  // Enhanced useEffect to handle scrolling
  useEffect(() => {
    if (listRef.current && selectedIndex !== -1) {
      const selectedItem = listRef.current.children[selectedIndex];
      if (selectedItem) {
        // Option 1: Scroll to the top
        listRef.current.scrollTop = selectedItem.offsetTop;

        // Option 2: Scroll to the middle (more advanced)
        // const listHeight = listRef.current.clientHeight;
        // const itemHeight = selectedItem.clientHeight;
        // const middleScrollTop = selectedItem.offsetTop - (listHeight / 2) + (itemHeight / 2);
        // listRef.current.scrollTop = middleScrollTop;
      }
    }
  }, [selectedIndex]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (listingId) => {
    navigate(`/listings/${listingId}`);
    setShowSuggestions(false);
    setQuery("");
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]._id);
    }
  };

  return (
    <div className="flex-1 flex justify-center">
      <div className="relative w-full max-w-md">
        <div className="flex items-center w-full border rounded-full shadow-sm hover:shadow-md transition-shadow focus-within:shadow-md">
          <input
            type="text"
            placeholder="Start your search"
            className="flex-grow py-2 px-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-full"
            value={query}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          <button className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full m-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto z-10 p-2"
            ref={listRef}
          >
            {suggestions.map((listing, index) => (
              <li
                key={listing._id}
                onClick={() => handleSuggestionClick(listing._id)}
                className={`flex items-center px-4 py-3 cursor-pointer text-gray-800 rounded-xl transition-colors duration-200 ${
                  index === selectedIndex ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-gray-400 w-4 h-4 mr-3"
                />
                <div className="flex flex-col">
                  <span className="font-medium">{listing.title}</span>
                  <span className="text-sm text-gray-500 truncate">
                    {listing.location || "Location not specified"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
