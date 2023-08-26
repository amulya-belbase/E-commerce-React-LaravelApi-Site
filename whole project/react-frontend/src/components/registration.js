import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  // Determining the fields required
  const [formData, setFormData] = react.useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [formErrors, setFormErrors] = react.useState({});
  const [isSubmit, setIsSubmit] = react.useState(false);
  const [isSuccess, setIsSuccess] = react.useState(true);

  // every change is attributed to name field of input tag and value is changed
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  async function handleRegistration(formData) {
    // actual passing of data through api
    // console.log(formData);
    let result = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    // console.log(result.message);
    if (result.message === "Email taken") {
      // alert ("Email already taken");
      setIsSuccess(false);
    } else if (result.message === "Registration success") {
      localStorage.setItem("vendor-info", JSON.stringify(result));
      alert("Registration Successful. Login with your new credentials");
      // setIsSuccess(true);
      navigate("/login");
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Enter your name";
    }
    if (!values.email) {
      errors.email = "Enter your email";
    }
    if (!values.password) {
      errors.password = "Enter your password";
    } else if (values.password.length < 4) {
      errors.password = "Password length must be more than 4 digits";
    }
    if (values.password != values.password_confirmation) {
      errors.password_confirmation = "Passwords don't match";
    }
    return errors;
  }

  useEffect(() => {
    // console.log(formData);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleRegistration(formData);
    }
  }, [formErrors]);

  return (
    <div className="registration">
      <div className="registrationback"></div>
      <div className="registrationcontent">
        <div className="regheader">
          <h2>Register</h2>
          <p className="belowregname">Create an account</p>
        </div>
        <form onSubmit={handleSubmit}>
          {isSuccess ? (
            // <p style={{ color: "green", fontSize: "17px", marginTop: "0px" }}>
            //   Registration Successful. Login with your new credentials
            // </p>
            ""
          ) : (
            <p style={{ color: "red", fontSize: "17px", marginTop: "0px" }}>
              Email already taken
            </p>
          )}
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.name}
            </p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.email}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.password}
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              name="password_confirmation"
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.password_confirmation}
            </p>
          </div>

          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="regbelow">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Registration;
