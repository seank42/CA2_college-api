import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ onChange, type, name, value }) => {
  return (
    <Form.Group className="flex flex-col capitalize">
      <Form.Label>{name}</Form.Label>
      <Form.Control
        className="border border-black rounded px-3 py-2 mt-2"
        onChange={onChange}
        type={type}
        name={name}
        value={value}
      />
    </Form.Group>
  );
};

export default Input;
