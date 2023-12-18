import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import LecCard from "../../components/LecCard";
import {
  delLecWithEnrolments,
  delLecWithoutEnrolments,
} from "../../utils/delLec";

const Index = ({ search, authenticated }) => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredLecturers, setFilteredLecturers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLecturers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (search.length <= 1) {
      setFilteredLecturers(lecturers);
    } else {
      let filter = lecturers.filter((lecturer) => {
        return lecturer.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredLecturers(filter);
    }
  }, [lecturers, search]);

  if (loading) return "Loading...";

  return (
    <div className="bg-white mt-5 mr-2 ml-2">
      <div className="flex flex-col-2 justify-between">
        <h2 className="pb mb-2 text-xl">
          <b className="text-3xl">Lecturers</b>
        </h2>
        <Link className="btn " to="/lecturers/create">
          Create
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 auto-cols-auto pb-16">
        {filteredLecturers.length > 0 ? (
          filteredLecturers.map((lecturer, i) => (
            <div key={i} className="border p-4">
              <Link
                to={`/lecturers/${lecturer.id}`}
                className="no-underline text-dark"
              >
                <LecCard
                  name={lecturer.name}
                  email={lecturer.email}
                  authenticated={authenticated}
                />
              </Link>
              {authenticated && <Alerts lecturer={lecturer} />}
            </div>
          ))
        ) : (
          <p>No lecturers found.</p>
        )}
      </div>
    </div>
  );
};

const Alerts = ({ lecturer }) => {
  const hasEnrolments = lecturer?.enrolments?.length;

  const HasEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this lecturer with enrolments?</h2>
        <button
          onClick={() => delLecWithEnrolments(lecturer)}
          className="btn mt-2 "
        >
          Yes
        </button>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn ">No</button>
          </form>
        </div>
      </>
    );
  };

  const NoEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this lecturer?</h2>
        <button
          onClick={() => delLecWithoutEnrolments(lecturer)}
          className="btn mt-2"
        >
          Yes
        </button>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">No</button>
          </form>
        </div>
      </>
    );
  };
  return (
    <>
      <button
        className="btn btn-outline btn-error"
        onClick={() =>
          document.getElementById(`lecturer.${lecturer.id}`).showModal()
        }
      >
        Delete
      </button>
      <dialog id={`lecturer.${lecturer.id}`} className="modal">
        <div className="modal-box">
          {hasEnrolments ? <HasEnrolments /> : <NoEnrolments />}
        </div>
      </dialog>
    </>
  );
};
export default Index;
