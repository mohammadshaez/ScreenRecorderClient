import React from "react";
import { Login } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./components/StateProvider";
import ScreenRecorder from "./pages/ScreenRecorder";

const App = () => {
  const {authState, dispatch} = useAuth();
  console.log(authState.currentUser)
  return (
    <Routes>
      <Route exact path="/" element={!authState.currentUser ? <Login /> : <ScreenRecorder/>} />
    </Routes>
  );
};

export default App;
