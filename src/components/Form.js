import React from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';

const Form = ({ onSubmit, children }) => {
  return (
    <BootstrapForm
      className="flex flex-col items-center space-y-4 max-w-2xl mx-auto pb-12 pt-4 border border-zinc-300"
      onSubmit={onSubmit}
      method="POST"
    >
      {children}
    </BootstrapForm>
  );
};

export default Form;
