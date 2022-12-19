import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Voter from './Voter'
import Home from './Home'
import Candidate from './Candidate'
import Vote from './Vote'
import Admin from "./Admin";
const Navigation = () => {

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg " >
          <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={"nav-link"} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/voter">
                  Voter
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/candidate">
                  Candidate
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/vote">
                  Vote
                </Link>
              </li>
              <li className="nav-item">
                <Link className={"nav-link"} to="/admin">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/voter" element={<Voter />} ></Route>
        <Route path="/candidate" element={<Candidate />} ></Route>
        <Route path="/vote" element={<Vote />} ></Route>
        <Route path="/admin" element={<Admin />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
