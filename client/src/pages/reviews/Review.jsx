import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StarRating from "../star/StarRating";
import ReviewForm from "./ReviewForm";

import { useSelector } from "react-redux";
import { getUserId } from "../../api/userApi";
import { fetchListingReviews, submitListingReview } from "../../api/reviewApi";

import { getMemberSinceText } from "../../utils/getMemberSinceText";

import ProtectedRoute from "../../ProtectedRoute.jsx";

export default function Reviews({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(6);

  const { id } = useParams();
  const access = useSelector((state) => state.auth.access);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetchListingReviews(listingId);

      if (res && res.data && res.data.listing && res.data.listing.reviews) {
        setReviews(res.data.listing.reviews);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReview = () => {
    setShowReviewForm(true);
  };

  const handleShowAllReviews = () => {
    setVisibleReviewsCount(reviews.length);
  };

  const handleNewReviewSubmit = async ({ rating, comment }) => {
    try {
      const res = await submitListingReview(
        listingId,
        getUserId(access),
        comment,
        rating
      );

      if (!res.error) {
        setShowReviewForm(false);
        await fetchReviews();
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, listingId]);

  if (isLoading) {
    return (
      <div className="mt-8 border-t pt-8 text-center text-gray-500">
        Loading reviews...
      </div>
    );
  }

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(2)
      : "0.00";

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-semibold">
          Average Rating : {averageRating}
          <span className="text-gray-500 font-normal ml-2">
            {" "}
            · {reviews.length} reviews
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
        {reviews.slice(0, visibleReviewsCount).map((review) => (
          <div
            key={review._id}
            className="mb-8 border border-gray-200 rounded-lg p-6 hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
          >
            {/* Header with profile */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={"placeholder.jpg"}
                alt={`${review.owner.email.substring(0, 4)}'s profile`}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-base">
                  {review.owner.email.substring(0, 4)}
                </h3>
                <p className="text-sm text-gray-500">
                  {getMemberSinceText(review.owner.registerDate)}
                </p>
              </div>
            </div>

            {/* Rating + Date */}
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={review.rating} />
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 leading-relaxed">
              {review.comment.length <= 150
                ? review.comment
                : review.comment.substring(0, 150)}
            </p>

            {review.comment.length > 150 && (
              <p className="underline underline-offset-2 cursor-pointer">
                {" "}
                show more
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 m-6">
        {reviews.length > 6 && visibleReviewsCount < reviews.length && (
          <button
            onClick={handleShowAllReviews}
            className="border border-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            Show all {reviews.length} reviews
          </button>
        )}

        <button
          onClick={handleCreateReview}
          className="border border-gray-400 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Write a review
        </button>
      </div>

      {showReviewForm && (
        <div className="mt-12">
          <ProtectedRoute></ProtectedRoute>
          <ReviewForm
            onCancel={() => setShowReviewForm(false)}
            onSubmit={handleNewReviewSubmit}
          />
        </div>
      )}
    </div>
  );
}
