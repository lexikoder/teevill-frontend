"use client"

import { useState } from "react";

const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formValues,
    handleChange,
    setFormValues,
  };
};

export default useForm;
