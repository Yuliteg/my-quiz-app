import { useState } from 'react';

export default function useForm(getModelObject) {

    const [values, setValues] = useState(getModelObject());
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let temp = {};
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "" : "Email is not valid";
      temp.name = values.name !== "" ? "" : "This field is required";
      setErrors(temp);
  
      return Object.values(temp).every((x) => x === "");
    };

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        validateForm
    }
}