import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { API_BASE_URL } from "./utils/config.js";
import { Provider } from "react-redux";
import { store } from "./store/skills-store/store-config.js";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>,
);
