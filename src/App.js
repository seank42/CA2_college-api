import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

import CoursesIndex from "./pages/courses/Index";
import CoursesShow from "./pages/courses/Show";
import CoursesCreate from "./pages/courses/Create";
import CoursesEdit from "./pages/courses/Edit";

import LecturersIndex from "./pages/lecturers/Index";
import LecturersShow from "./pages/lecturers/Show";
import LecturersCreate from "./pages/lecturers/Create";
import LecturersEdit from "./pages/lecturers/Edit";



import Navbar from "./components/Navbar";
import RegisterForm from "./components/Register";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  const onHandleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Router>
        <Navbar
          onHandleChange={onHandleChange}
          search={search}
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
        <Routes>
          <Route
            path="/register"
            element={
              <RegisterForm
                authenticated={authenticated}
                onAuthenticated={onAuthenticated}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                authenticated={authenticated}
                onAuthenticated={onAuthenticated}
              />
            }
          />
          <Route
            path="/courses"
            element={
              <CoursesIndex
                onHandleChange={onHandleChange}
                search={search}
                authenticated={authenticated}
                onAuthenticated={onAuthenticated}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/courses/create" element={<CoursesCreate />} />
          <Route path="/courses/:id/edit" element={<CoursesEdit />} />
          <Route
            path="/courses/:id"
            element={
              <CoursesShow onHandleChange={onHandleChange} search={search} />
            }
          />
          <Route
            path="/lecturers"
            element={
              <LecturersIndex
                onHandleChange={onHandleChange}
                search={search}
                authenticated={authenticated}
                onAuthenticated={onAuthenticated}
              />
            }
          />
          <Route path="/lecturers/create" element={<LecturersCreate />} />
          <Route path="/lecturers/:id/edit" element={<LecturersEdit />} />
          <Route
            path="/lecturers/:id"
            element={
              <LecturersShow onHandleChange={onHandleChange} search={search} />
            }
          />
          
          
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
