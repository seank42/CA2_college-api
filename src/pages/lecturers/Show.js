import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteBut from "../../components/DelBut";
import {
  delLecWithEnrolments,
  delLecWithoutEnrolments,
} from "../../utils/delLec";

const Show = (...props) => {
  const { id } = useParams();
  const [lecturer, setLecturers] = useState(null);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setLecturers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]); 
  if (!lecturer) return <h3>Loading lecturer..</h3>;

  return (
    <>
      <h2 className="text-xl mb-5 ml-5 mt-5 pt-5">
        <b className="text-3xl text-amber-800">{lecturer.name}</b>
      </h2>
      <div className="flex flex-col-2 ml-5 mr-5 m-5 border border-zinc-300 p-5 ">
        <div className=" text-left lg-center ">
          <div className="bg-white ">
            <div className="p-2 text-lg">
              {/* Display lecturer details */}
              <p className="pb-3">
                {" "}
                <b className="text-danger text-lg fw-bolder">Name: </b>
                {lecturer.name}
              </p>
              <p className="pb-3">
                {" "}
                <b className="text-danger text-lg fw-bolder">Email: </b>
                {lecturer.email}
              </p>
              <p className="pb-3">
                {" "}
                <b className="text-danger text-lg fw-bolder">Phone number: </b>
                {lecturer.phone}
              </p>
              <p className="pb-3">
                {" "}
                <b className="text-danger text-lg fw-bolder">Address: </b>
                {lecturer.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-2 mt-4 ml-3">
        <Link to={`/lecturers/${id}/edit`}>
          <button className="btn btn-outline  mr-3 ">Edit</button>{" "}
        </Link>
        <Alerts lecturer={lecturer} navigate={navigate} />
      </div>
    </>
  );
};
const Alerts = ({ lecturer, navigate }) => {
  const hasEnrolments = lecturer?.enrolments?.length;
  const redirect = true;
  const HasEnrolments = () => {
    return (
      <>
        <h2>Are you sure you want to delete this lecturer with enrolments?</h2>
        <button
          onClick={() =>
            delLecWithEnrolments(lecturer, navigate, redirect)
          }
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
        <h2>Are you sure you want to delete this lecturer?</h2>
        <button
          onClick={() =>
            delLecWithoutEnrolments(lecturer, navigate, redirect)
          }
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
          document.getElementById(`lecturer.${lecturer?.id}`).showModal()
        }
      >
        Delete
      </button>
      <dialog id={`lecturer.${lecturer?.id}`} className="modal">
        <div className="modal-box">
          {hasEnrolments ? <HasEnrolments /> : <NoEnrolments />}
        </div>
      </dialog>
    </>
  );
};
export default Show;
