import axios from "axios";

export const axiosApi = async ({ query, action }) => {
  let result = {};

  const api = axios.create({
    baseURL: `https://voltagegreen.com.au/index/payment`,
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
  });

  await api.post("", query).then((response) => {
    result = response;
  });
  return result;
};
