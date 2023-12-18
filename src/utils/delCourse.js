import axios from 'axios';

async function delCourse(courseId, token) {
  return axios.delete(`https://college-api.vercel.app/api/courses/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function delCourseWithEnrolments(course, navigate, redirect = false) {
  try {
    const token = localStorage.getItem('token');

    await delCourse(course.id, token);

    alert('Course deleted successfully.');

    redirect ? navigate('/courses') : window.location.reload();
  } catch (error) {
    console.error('Error deleting course:', error);
    alert('An error occurred while deleting the course.');
  }
}

export async function delCourseWithoutEnrolments(course, navigate, redirect = false) {
  try {
    const token = localStorage.getItem('token');

    await delCourse(course.id, token);

    alert('Course deleted successfully.');

    redirect ? navigate('/courses') : window.location.reload();
  } catch (error) {
    console.error('Error deleting course:', error);
    alert('An error occurred while deleting the course.');
  }
}
