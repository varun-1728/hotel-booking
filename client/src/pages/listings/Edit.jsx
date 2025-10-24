import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleListing, updateSingleListing } from "../../api/listingApi";

export default function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();

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

  useEffect(() => {
    const fetchListings = async () => {
      const data = (await fetchSingleListing(id)).data;
      setFormData(data);
    };

    fetchListings();
  }, []);

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

    const res = await updateSingleListing(id, formData);

    if (!res.error) {
      navigate(`/listings/${id}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6">Edit your Listing</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              type="text"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition min-h-[100px]"
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 mb-1">
              Image Link
            </label>
            <input
              id="image"
              name="image"
              placeholder="Enter image URL/Link"
              value={formData.image?.url || ""}
              type="text"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="price" className="block text-gray-700 mb-1">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  type="number"
                  onChange={handleChange}
                  className="w-full pl-6 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="country" className="block text-gray-700 mb-1">
                Country
              </label>
              <input
                id="country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                type="text"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              type="text"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          >
            Make changes
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-gray-600 hover:text-gray-800 underline">
            &larr; Back to Listing
          </a>
        </div>
      </div>
    </div>
  );
}
