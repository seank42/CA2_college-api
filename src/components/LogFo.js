import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const LogFo = ({ authenticated, onAuthenticated }) => {
  const errStyle = {
    color: "red",
  };

  const [form, setForm] = useState({
    email: "sam@bloggs.com",
    password: "secret",
  });

  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    axios
      .post(`https://college-api.vercel.app/api/login`, {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
        navigate("/courses");
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
        setErrMessage(err.response.data.message);
      });
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="  lg-center container place-content-center">
        <div className="text-center lg-center cover-full  bg-blue-200 pb-4 pt-4">
          <h2 className="text-xl text-white">User Login</h2>
        </div>
        <div className="flex flex-col items-center space-y-8 mt-12">
          <Input
            onChange={handleForm}
            type="text"
            name="email"
            value={form.email}
          />
          <div className="mt-5">
            <Input
              onChange={handleForm}
              type="password"
              name="password"
              value={form.password}
            />
          </div>

          <button className=" btn btn-active" onClick={handleClick}>
            Submit
          </button>
          <p style={errStyle}>{errMessage}</p>
          <div>
            <Link className=" underline  text-blue-500" to="/register">
               Register here.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogFo;
