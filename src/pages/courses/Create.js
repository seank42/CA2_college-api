import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Form from "../../components/Form";

const Create = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState();
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    points: "",
    level: "",
  });

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let include = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        include = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });

    return include;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (isRequired(["title", "code", "description", "points", "level"])) {
      let token = localStorage.getItem("token");

      axios
        .post(`https://college-api.vercel.app/api/courses`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/courses");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <h2 className="mb-3 ml-3 text-lg">
        <b>Create Course</b>
      </h2>

      <Form
        className="flex flex-col items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-zinc-300"
        onSubmit={submitForm}
        method="POST"
      >
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="text"
          onChange={handleForm}
          value={form.title}
          name="title"
        />
        <span className="text-red-600">{errors?.title?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="text"
          onChange={handleForm}
          value={form.code}
          name="code"
        />
        <span className="text-red-600">{errors?.code?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="text"
          onChange={handleForm}
          value={form.description}
          name="description"
        />
        <span className="text-red-600">{errors?.description?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="number"
          onChange={handleForm}
          value={form.points}
          name="points"
        />
        <span className="text-red-600">{errors?.points?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="number"
          onChange={handleForm}
          value={form.level}
          name="level"
        />

        <span className="text-red-600">{errors?.level?.message}</span>

        <input className="btn btn-active" type="submit" />
      </Form>
    </>
  );
};

export default Create;
