export const evaluatePasswordError = password => {
  let error = "";
  if (!password.length) {
    error = "Password must be non empty";
  }

  return error;
};

export const evaluateEmailError = email => {
  let error = "";
  if (!email.length) {
    error = "Email must be non empty";
  }

  return error;
};

export const isFormValid = (email, password) => {
  console.log(!evaluatePasswordError(password) && !evaluateEmailError(email));
  return !evaluatePasswordError(password) && !evaluateEmailError(email);
};
