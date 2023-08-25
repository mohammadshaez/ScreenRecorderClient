import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reducer, {
  AuthProvider,
  initialState,
} from "./components/StateProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider initialState={initialState} reducer={reducer}>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
