import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  delCourseWithEnrolments,
  delCourseWithoutEnrolments,
} from "../../utils/delCourse";

const Show = () => {
  const { id } = useParams();

  const [course, setCourses] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); 

  if (!course) return <h3>Loading course..</h3>;

  return (
    <>
    
      <h2 className="text-xl mb-5 ml-5 mt-5 pt-5">
        <b className="text-3xl text-amber-800">{course.title}</b>
      </h2>
      <div className="flex flex-col-2 ml-5 mr-5 m-5 border border-zinc-300 p-5 ">
        <div className=" text-left lg-center ">
          <div className="bg-white ">
            <div className="p-2 text-lg">
              <p className="pb-3">
                <b className="text-danger fw-bolder">Description: </b>
                {course.description}
              </p>
              <p className="pb-3 ">
                <b className="text-danger">Points needed: </b>
                {course.points}
              </p>
              <p className="pb-3">
                <b className="text-danger text-lg fw-bolder">Level: </b>
                {course.level}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-2 mt-4 ml-3 ">
        <Link to={`/courses/${id}/edit`}>
          <button className="btn btn-outline mr-3">Edit</button>
        </Link>

        <Alerts course={course} navigate={navigate} />
      </div>
    </>
  );
};

const Alerts = ({ course, navigate }) => {
  const hasEnrolments = course?.enrolments?.length;

  const HasEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this course with enrolments?</h2>
        <button
          onClick={() => delCourseWithEnrolments(course, navigate)}
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

  const NoEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this course?</h2>
        <button
          onClick={() => delCourseWithoutEnrolments(course, navigate)}
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
        className="btn btn-outline "
        onClick={() =>
          document.getElementById(`course.${course?.id}`).showModal()
        }
      >
        Delete
      </button>
      <dialog id={`course.${course?.id}`} className="modal">
        <div className="modal-box">
          {hasEnrolments ? <HasEnrolments /> : <NoEnrolments />}
        </div>
      </dialog>
    </>
  );
};

export default Show;
