// Show.jsx
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Reviews from "../reviews/Review";
import { fetchSingleListing, deleteSingleListing } from "../../api/listingApi";
import Map from "../map/Map";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState({});

  useEffect(() => {
    const fetchListing = async () => {
      const data = await fetchSingleListing(id);
      setListing(data.data);
    };

    fetchListing();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteSingleListing(id);

    if (!res.error) {
      navigate("/listings");
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-semibold mb-1">
          {listing.title}
        </h1>
        <p className="text-gray-600 text-lg">
          {listing.location}, {listing.country}
        </p>
      </div>

      {/* Image Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8">
        {/* Main Large Image (takes 2 columns and 2 rows on larger screens) */}
        <div className="md:col-span-2 md:row-span-2 h-[300px] md:h-[450px] lg:h-[510px]">
          <img
            src={listing.image?.url}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Smaller Images (fill the remaining grid space) */}
        <div className="hidden md:block h-[150px] lg:h-[250px]">
          <img
            src={listing.image?.url} // Using the same image for demonstration
            alt={`${listing.title} - 1`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block h-[150px] lg:h-[250px]">
          <img
            src={listing.image?.url} // Using the same image for demonstration
            alt={`${listing.title} - 2`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block h-[150px] lg:h-[250px]">
          <img
            src={listing.image?.url} // Using the same image for demonstration
            alt={`${listing.title} - 3`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block h-[150px] lg:h-[250px]">
          <img
            src={listing.image?.url} // Using the same image for demonstration
            alt={`${listing.title} - 4`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="lg:w-2/3">
          {/* Host Info and Description */}
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Hosted by{" "}
              <span className="font-bold">{listing.owner?.username}</span>
            </h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          {/* Action Buttons - Placed below description */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Link
              to={`/listings/${listing._id}/edit`}
              className="bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center flex-grow"
            >
              Edit this Listing
            </Link>
            <form onSubmit={handleDelete} className="flex-grow">
              <button
                type="submit"
                className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 w-full"
              >
                Delete this Listing
              </button>
            </form>
          </div>
        </div>

        {/* Booking and Price Card */}
        <div className="lg:w-1/3">
          <div className="border rounded-xl p-6 shadow-lg sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-2xl font-semibold">
                &#x20B9;{listing.price?.toLocaleString("en-IN")}
                <span className="text-lg font-normal"> / night</span>
              </p>
            </div>

            {/* Placeholder for a future booking form */}
            <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 italic">
              (Booking form would go here)
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews listingId={id} />

      {/* Where you'll be Section */}
      <div className="my-8 border-b pb-8">
        <h2 className="text-2xl font-semibold mb-4">Where you'll be</h2>
        {listing && (
          <Map
            lat={listing?.geometry?.coordinates[1]}
            lng={listing?.geometry?.coordinates[0]}
          />
        )}
      </div>
    </div>
  );
}
