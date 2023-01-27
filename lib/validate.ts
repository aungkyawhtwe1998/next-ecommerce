type Value = {
    name: string;
    email: string;
    password: string;
    cpassword: string;
    passcode: number;
  };
  
  type Error = {
    name?: string;
    email?: string;
    password?: string;
    cpassword?: string;
    passcode?: number | string;
  };
  
  export const signUpValidate = (values: Value) => {
    const errors: Error = {};
  
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.includes(" ")) {
      errors.name = "Invalid Username!";
    }
  
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4 || values.password.length > 10) {
      errors.password = "Must be greater then 4 and less then 10 characters long";
    } else if (values.password.includes(" ")) {
      errors.password = "Invalid Password";
    }
  
    if (!values.cpassword) {
      errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "Password Not Match!";
    } else if (values.cpassword.includes(" ")) {
      errors.cpassword = "Invalid Confirm Password";
    }

  
    return errors;
  };