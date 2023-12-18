import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteBut = ({ id, resource, onClick }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDelete = () => {
    setLoading(true);

    const token = localStorage.getItem('token');

    axios
      .delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        if (onClick) {
          onClick();
        } else {
          navigate('/courses');
        }
      })
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      variant={`outline-dark ${isLoading ? 'disabled' : ''}`}
      onClick={onDelete}
      disabled={isLoading}
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </Button>
  );
};

export default DeleteBut;
