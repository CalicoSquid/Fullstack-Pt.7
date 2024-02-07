import axios from "axios";
const baseUrl = "/api/users";

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createNew = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { getAll, createNew };
