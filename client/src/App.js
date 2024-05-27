import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ListingsPage from "./Pages/ListingsPage";
import ProfilePage from "./Pages/ProfilePage";
import PropertyPage from "./Pages/PropertyPage";

function App() {
  axios.defaults.baseURL = `https://rentify-1hdm.onrender.com/api/`;
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/user-profile" element={<ProfilePage />} />
        <Route path="/property/:id" element={<PropertyPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
