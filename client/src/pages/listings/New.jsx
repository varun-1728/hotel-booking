import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewListing } from "../../api/listingApi";

export default function New() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: {
      url: "",
      filename: "",
    },
    price: "",
    location: "",
    country: "",
  });

  const handleChange = (e) => {
    e.target.name !== "image"
      ? setFormData({ ...formData, [e.target.name]: e.target.value })
      : setFormData({
          ...formData,
          image: {
            ...formData.image,
            url: e.target.value,
          },
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createNewListing(formData);

    if (!res.error) {
      navigate("/listings");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 font-sans">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h3 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Create a New Listing
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            placeholder="Enter title"
            type="text"
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          />
          <textarea
            name="description"
            placeholder="Enter description"
            onChange={handleChange}
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 min-h-[120px]"
          ></textarea>
          <input
            name="image"
            placeholder="Enter image URL/Link"
            type="text"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          />
          <input
            name="price"
            placeholder="Enter price"
            type="number"
            required
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          />
          <input
            name="location"
            placeholder="Enter location"
            type="text"
            required
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          />
          <input
            name="country"
            placeholder="Enter country"
            type="text"
            required
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          />
          <button
            type="submit"
            className="w-full py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
