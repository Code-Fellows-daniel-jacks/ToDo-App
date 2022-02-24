import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    values.id = uuid();
    values.complete = false;

    callback(values);
  };

  const handleChange = (event) => {
    event.persist();

    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;