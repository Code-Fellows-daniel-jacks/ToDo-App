import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const useForm = (callback) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    let decoupledValue = JSON.parse(JSON.stringify(values));
    callback(decoupledValue); // courtesy of Kellen, this removes the reference to the previous object and creates a new one to update state with.
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