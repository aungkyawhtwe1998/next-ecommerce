import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "content-type": "application/json",
  },
});
