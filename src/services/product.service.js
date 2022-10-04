import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1/products";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllProducts = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createProduct = (dataForProduct) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.post(baseUrl, dataForProduct, config);
  return request.then((response) => response.data);
};

const updateProduct = (id, dataForProduct) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.put(`${baseUrl}/${id}`, dataForProduct, config);
  return request.then((response) => response.data);
};

export default { getAllProducts, createProduct, updateProduct, setToken };
