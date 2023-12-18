import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const RegisterForm = ({ onAuthenticated }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);

    axios
      .post(`https://college-api.vercel.app/api/register`, {
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
      })
      .finally(() => setLoading(false)); 
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="lg-center container place-content-center">
      <div className="text-center lg-center cover-full bg-blue-200 pb-4 pt-4">
        <h2 className="text-xl text-white">User Register</h2>
      </div>
      <div className="flex flex-col items-center space-y-8 mt-12">
        <Input onChange={handleForm} type="text" name="name" value={form.name} />
        <Input onChange={handleForm} type="text" name="email" value={form.email} />
        <div className="mt-5">
          <Input onChange={handleForm} type="password" name="password" value={form.password} />
        </div>
        <button className="btn btn-active" onClick={handleClick} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        <p style={{ color: "red" }}>{errMessage}</p>
        <div>
          <Link className="underline mt-3 text-blue-500" to="/">
            Have an account? Login here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;