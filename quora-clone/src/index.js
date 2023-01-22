import React from "react";
import ReactDOM from "react-dom/client";
import App from "./componets/App";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { Provider } from "react-redux";
import store from './store'

store.subscribe(()=> console.log('Store data', store.getState()))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </Provider>
);
