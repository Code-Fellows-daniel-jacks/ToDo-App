import { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';

import { LoginContext } from '../components/auth/authContext';

const useForm = (callback) => {

  const [values, setValues] = useState({});
  const authContext = useContext(LoginContext);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    values.trackId = uuid();
    values.complete = false;
    values.difficulty = values.difficulty ?? 3;

    fetch(`http://localhost:3001/api/v2/todo`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authContext.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values })
    })
      .then(success => {
        let decoupledValue = JSON.parse(JSON.stringify(values));
        callback(decoupledValue); // courtesy of Kellen, this removes the reference to the previous object and creates a new one to update state with.
      })
      .catch(err => console.log(err));
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