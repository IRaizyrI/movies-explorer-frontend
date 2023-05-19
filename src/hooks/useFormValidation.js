import { useCallback, useState, useEffect } from "react";

export const useFormValidation = (isNameRequired = false) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [targetValue, setTargetValue] = useState('')

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setTargetValue(target)
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );
  };

  const validateName = (name) => {
    return String(name)
      .match(
        /^[а-яА-Я a-zA-Z-\s]{1,50}$/
      );
  };

  useEffect(() => {
    const errorMessage = {};
    errorMessage.email = values.email && validateEmail(values.email) ? '' : 'Указан недействительный Email';
    errorMessage.password = values.password ? '' : 'Не введен пароль';
    if (isNameRequired) {
      errorMessage.name = values.name && validateName(values.name) ? '' : 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
    }
    setErrors(errorMessage);
    setIsValid(
      Boolean(values.email && validateEmail(values.email)) &&
      Boolean(values.password) &&
      (isNameRequired ? Boolean(values.name && validateName(values.name)) : true) &&
      targetValue.checkValidity()
    )
  }, [values, targetValue, isNameRequired])


  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
};
