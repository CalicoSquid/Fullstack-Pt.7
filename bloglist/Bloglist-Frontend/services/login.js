import axios from "axios";
const baseurl = "/api/login";

const login = async (credentials) => {
  const user = await axios.post(baseurl, credentials);
  return user.data;
};

export default { login };
