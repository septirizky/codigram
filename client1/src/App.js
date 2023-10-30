import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AddPosting from "./components/Posting";
import ListPosting from "./components/ListPosting";
import { Register } from "./components/register";
import { Sidebar } from "./components/sidebar";
import Login from "./components/log";
import Logout from "./components/logout";
import Profile from "./components/Profil";
import Search from "./components/search";

function App() {
  return (
    <div className="container-fluid">
      <div className="container text-center">
        <h1>Welcome to Codigram</h1>
        <p>Lorem ipsum is a dummy text</p>
        <hr />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<ListPosting />} />
            <Route path="/dashboard/home" element={<ListPosting />}></Route>
            <Route
              path="/dashboard/AddPosting"
              element={<AddPosting />}
            ></Route>
            <Route path="/dashboard/logout" element={<Logout />}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route path="/dashboard/search" element={<Search />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
