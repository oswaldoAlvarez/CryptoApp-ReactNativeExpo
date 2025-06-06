import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    Accept: "application/json",
  },
  timeout: 7000,
});
