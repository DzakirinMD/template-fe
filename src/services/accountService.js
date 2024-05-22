import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/accounts";

export const withdrawAccount = (withdrawalData) => {
  return axios.post(`${REST_API_BASE_URL}/withdraw`, withdrawalData);
};
