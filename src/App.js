import React, { useEffect, useState } from "react";
import "./App.css";
import authService from "./services/auth.service";
import productService from "./services/product.service";

const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      setUser(user);
      productService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      productService.getAllProducts().then((products) => {
        console.log(products);
        setProducts(products);
      });
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const user = await authService.loginUser({
        email,
        password,
      });

      console.log(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      productService.setToken(user.token);

      setUser(user);
      setEmail("");
      setPassword("");
    } catch (e) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    productService.setToken(null);
    window.localStorage.removeItem("loggedUser");
  };

  if (error) return "Error!";

  if (user)
    return (
      <div className="App">
        <div className="Header">
          <div className="HeaderContent">
            <button
              className="btn btn-primary btn-round"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="Products">
          {products.map((product, index) => (
            <div className="Product" key={index}>
              <h1>{product.product_name}</h1>
              <h3>{product.product_price}</h3>
              <button className="btn btn-primary btn-round">Update</button>
            </div>
          ))}
        </div>
      </div>
    );
  else
    return (
      <div className="Login">
        <div className="LoginForm">
          <h1>Login user</h1>
          <input
            className="input"
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary btn-round"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      </div>
    );
};

export default App;
