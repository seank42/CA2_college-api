import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Form from "../../components/Form";

const Create = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
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
    fields.forEach((field, i) => {
      console.log("field", !form[field], field, i);
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
    console.log("submitted", form);
    console.log(
      "boolean check",
      isRequired(["name", "address", "phone", "email"])
    );
    if (isRequired(["name", "address", "phone", "email"])) {
      let token = localStorage.getItem("token");

      axios
        .post(`https://college-api.vercel.app/api/lecturers`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/lecturers");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <h2 className="mb-3 ml-3 text-lg">
        <b>Create Lecturers</b>
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
          value={form.name}
          name="name"
        />
        <span className="text-red-600">{errors?.name?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="text"
          onChange={handleForm}
          value={form.address}
          name="address"
        />
        <span className="text-red-600">{errors?.address?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="number"
          onChange={handleForm}
          value={form.phone}
          name="phone"
        />
        <span className="text-red-600">{errors?.phone?.message}</span>
        <Input
          className="border border-black rounded pr-5 pl-5 "
          type="text"
          onChange={handleForm}
          value={form.email}
          name="email"
        />
        <span className="text-red-600">{errors?.email?.message}</span>
        <input className="btn btn-active" type="submit" />
      </Form>
    </>
  );
};

export default Create;
