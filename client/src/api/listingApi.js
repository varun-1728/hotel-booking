import axios from "axios";
import { wrapAsync } from "../utils/wrapAsync";
import { getCoordinatesFromAddress } from "../services/geocodingService";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchAllListings = wrapAsync(async () => {
  const res = await axios.get(`${API_BASE_URL}/listings`);
  return res.data;
});

export const fetchSingleListing = wrapAsync(async (id) => {
  const res = await axios.get(`${API_BASE_URL}/listings/${id}`);
  return res.data;
});

export const updateSingleListing = async (id, formData) => {
  const geometry = await getCoordinatesFromAddress(
    formData.location + " " + formData.country
  );

  const res = await axios.put(`${API_BASE_URL}/listings/${id}`, {
    listing: { ...formData, geometry },
  });

  return res.data;
};

export const createNewListing = wrapAsync(async (formData) => {
  const geometry = await getCoordinatesFromAddress(
    formData.location + " " + formData.country
  );

  const res = await axios.post(`${API_BASE_URL}/listings`, {
    listing: { ...formData, geometry },
  });

  console.log(res.data);
  return res.data;
});

export const deleteSingleListing = wrapAsync(async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/listings/${id}`);
  return res.data;
});
