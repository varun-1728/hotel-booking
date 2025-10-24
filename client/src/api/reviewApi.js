import axios from "axios";
import { wrapAsync } from "../utils/wrapAsync";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchListingReviews = wrapAsync(async (id) => {
  const res = await axios.get(`${API_BASE_URL}/listings/${id}/reviews`);
  return res.data;
});

export const submitListingReview = wrapAsync(
  async (id, userId, comment, rating) => {
    const res = await axios.post(
      `${API_BASE_URL}/listings/${id}/reviews/${userId}`,
      {
        review: {
          comment,
          rating,
        },
      }
    );
    return res.data;
  }
);
