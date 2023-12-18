import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../components/Form";
import Input from "../../components/Input";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lecturers, setLecturers] = useState(null);
  const [errors, setErrors] = useState({});

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
    const newErrors = {};
    fields.forEach((field) => {
      if (!form[field]) {
        include = false;
        newErrors[field] = {
          message: `${field} is required`,
        };
      }
    });

    setErrors(newErrors);
    return include;
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(isRequired(["name", "address", "phone", "email"]));
    if (isRequired(["name", "address", "phone", "email"])) {
      const token = localStorage.getItem("token");

      axios
        .put(`https://college-api.vercel.app/api/lecturers/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/lecturers/${id}`);

          setLecturers(response.data);

          return response;
        })
        .catch((err) => {
          console.error(err);
          setErrors({
            general: {
              message: "An error occurred while submitting the form.",
            },
          });
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLecturers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!lecturers) return <h3>No lecturers found.</h3>;

  return (
    <>
      <h2 className="mb-3 ml-3 text-lg">
        <b>Edit Lecturers</b>
      </h2>
      <Form onSubmit={submitForm}>
        <Input
          type="text"
          onChange={handleForm}
          value={form.name}
          name="name"
        />
        <span className="text-red-600">{errors?.name?.message}</span>
        <Input
          type="text"
          onChange={handleForm}
          value={form.address}
          name="address"
        />
        <span className="text-red-600">{errors?.address?.message}</span>
        <Input
          type="number"
          onChange={handleForm}
          value={form.phone}
          name="phone"
        />
        <span className="text-red-600">{errors?.phone?.message}</span>
        <Input
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

export default Edit;
