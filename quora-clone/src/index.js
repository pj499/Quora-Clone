import React from "react";
import ReactDOM from "react-dom/client";
import App from "./componets/App";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from './store'
import {persistStore} from 'redux-persist'

store.subscribe(() => console.log("Store data", store.getState()));
let persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </AuthProvider>
  </Provider>
);
