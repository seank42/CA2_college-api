import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CoursesCard from "../../components/CoursesCard";
import {
  delCourseWithEnrolments,
  delCourseWithoutEnrolments,
} from "../../utils/delCourse";


const Index = ({ search, authenticated }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://college-api.vercel.app/api/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (search.length <= 1) {
      setFilteredCourses(courses);
    } else {
      const filter = courses.filter((course) => {
        return course.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredCourses(filter);
    }
  }, [courses, search]);

  if (loading) return "Loading...";

  return (
    <div className="bg-white mt-5 mr-2 ml-2">
      <div className="flex flex-col-2 justify-between">
        <h2 className="pb mb-2 text-xl">
          <b className="text-3xl">Courses</b>
        </h2>
        <Link className="btn" to="/courses/create">
          Create
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 auto-cols-auto pb-16">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, i) => (
            <div key={i} className="border p-4">
              <Link
                to={`/courses/${course.id}`}
                className="no-underline text-dark"
              >
                <CoursesCard
                  title={course.title}
                  points={course.points}
                  authenticated={authenticated}
                />
              </Link>
              {authenticated && <Alerts course={course} />}
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

const Alerts = ({ course }) => {
  const hasEnrolments = course?.enrolments?.length;

  const HasEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this course with enrolments?</h2>
        <div className="mr-12">
          <button
            onClick={() => delCourseWithEnrolments(course)}
            className="btn"
          >
            Yes
          </button>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </>
    );
  };
  const NoEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this course?</h2>
        <button
          onClick={() => delCourseWithoutEnrolments(course)}
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
          document.getElementById(`course.${course.id}`).showModal()
        }
      >
        Delete
      </button>
      <dialog id={`course.${course.id}`} className="modal">
        <div className="modal-box">
          {hasEnrolments ? <HasEnrolments /> : <NoEnrolments />}
        </div>
      </dialog>
    </>
  );
};

export default Index;
