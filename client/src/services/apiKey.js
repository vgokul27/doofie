import axios from "axios";
import { getAuthToken } from "./firebase";

export const fetchApiKey = async () => {
  const token = await getAuthToken();
  const res = await axios.get("http://localhost:5000/api/apikey", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.apiKey;
};

export const regenerateKey = async () => {
  const token = await getAuthToken();
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/apikey/regenerate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.apiKey;
};
