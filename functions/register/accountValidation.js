const valid = function (x) {
  const min3max15NN = (test) => {
    return test === null
      ? "feild required"
      : test.length < 3
      ? "minimum 3 characters required"
      : test.length > 15
      ? "maximum 15 characters"
      : null;
  };

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  let formErrors = {
    success: null,
    firstName: null,
    lastName: null,
    attending: null,
    email: null,
    selection: null,
    sent: null,
  };

  formErrors.firstName = min3max15NN(x.firstName);
  formErrors.lastName = min3max15NN(x.lastName);
  formErrors.attending = x.attending == null ? "feild required" : null;

  if (x.attending == false || x.attending == null) {
    return formErrors;
  } else {
    formErrors.email =
      x.email == null
        ? "feild required"
        : !emailRegex.test(x.email)
        ? "please enter a valid email"
        : null;

    formErrors.selection = x.selection == null ? "feild required" : null;

    return formErrors;
  }
};

exports.valid = valid;
