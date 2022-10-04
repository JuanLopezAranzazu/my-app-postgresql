import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/auth";

const loginUser = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};

export default { loginUser };
