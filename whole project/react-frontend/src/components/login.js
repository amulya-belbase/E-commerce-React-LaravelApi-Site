import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = react.useState(true);
  // Determining the fields required
  const [formData, setFormData] = react.useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = react.useState({});
  const [isSubmit, setIsSubmit] = react.useState(false);

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

  async function handleLogin(formData) {
    // actual passing of data through api
    // console.log(formData);
    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    if (result.key === "Invalid Login") {
      // alert("Invalid Login");
      setIsSuccess(false);
    } else {
      localStorage.setItem("vendor-info", JSON.stringify(result));
      // alert("Login Successful");
      navigate("/");
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Enter your email";
    }
    if (!values.password) {
      errors.password = "Enter your password";
    } else if (values.password.length < 4) {
      errors.password = "Password length must be more than 4 digits";
    }
    return errors;
  }

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleLogin(formData);
    }
  }, [formErrors]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginform"></div>
      <div className="innerloginform">
        <div className="displayform">
          <h2>Login Form</h2>
        </div>
        <div className="actualform">
          {isSuccess ? (
            // <p style={{ color: "green", fontSize: "17px", marginTop: "0px" }}>
            //   Registration Successful. Login with your new credentials
            // </p>
            ""
          ) : (
            <p style={{ color: "red", fontSize: "17px", marginTop: "0px" }}>
              Invalid Login
            </p>
          )}
          <div className="inputdiv">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.email}
            </p>
          </div>

          <div className="inputdiv">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <p
              classname="errorsmsg"
              style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
            >
              {formErrors.password}
            </p>
          </div>

          <div className="inputdiv">
            <button type="submit">Log In</button>
          </div>

          <div className="loginbelow">
            <p>
              Don't have an account?
              <a href="/registration"> Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
