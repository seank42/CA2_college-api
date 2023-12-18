import axios from "axios";

export async function delLecWithEnrolments(lecturer, navigate, redirect = false) {
  const token = localStorage.getItem("token");

  let listOfDeleteRequests = lecturer.enrolments.map((current, index) =>
    axios.delete(
      `https://college-api.vercel.app/api/enrolments/${current.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
  axios.all(listOfDeleteRequests).then((response) => {
    axios
      .delete(`https://college-api.vercel.app/api/lecturers/${lecturer.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        redirect? navigate('/lecturers') : window.location.reload()
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export async function delLecWithoutEnrolments(lecturer, navigate, redirect = false) {
  const token = localStorage.getItem("token");
  axios
    .delete(`https://college-api.vercel.app/api/lecturers/${lecturer.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
        redirect? navigate('/lecturers') : window.location.reload()
    })
    .catch((error) => {      console.log(error);
    });
}
