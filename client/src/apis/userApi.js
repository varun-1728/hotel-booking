import axios from "axios";
import { wrapAsync } from "../utils/wrapAsync";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getUserId = (accessToken) => {
  const access = accessToken;
  const [header, payload, signature] = access.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload.sub;
};

export const fetchUserDetailsApi = wrapAsync(async (accessToken) => {
  const res = await axios.get(`${API_BASE_URL}/user/${getUserId(accessToken)}`);
  return res.data;
});
