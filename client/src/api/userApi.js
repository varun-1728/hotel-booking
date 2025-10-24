import axios from "axios";
import { wrapAsync } from "../utils/wrapAsync";

const API_BASE_URL = "http://localhost:8080/api";

export const getUserId = (accessToken) => {
  const access = accessToken;
  const [header, payload, signature] = access.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload.sub;
};

export const fetchUserDetailsApi = wrapAsync(async (accessToken) => {
  // console.log(accessToken);
  // console.log(getUserId(accessToken));
  const res = await axios.get(`${API_BASE_URL}/user/${getUserId(accessToken)}`);
  return res.data;
});
