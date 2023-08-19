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

  async function handleSubmit(event) {
    event.preventDefault(); // to stop refreshing
    if (formData.password != formData.password_confirmation) {
      alert("Password Doesnt match");
    } else {
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
      // console.log(result)
      localStorage.setItem("vendor-info", JSON.stringify(result));
      alert("Registration Successful. Login with your new credentials");
      navigate("/login");
    }
  }

  return (
    <div>
      <div>
        <header>
          <h2>Register</h2>
          <p>Create an account</p>
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="name">Name</label>
            <input type="text" onChange={handleChange} name="name" />
          </div>

          <div>
            <label for="email">Email</label>
            <input type="email" onChange={handleChange} name="email" />
          </div>

          <div>
            <label for="password">Password</label>
            <input type="password" onChange={handleChange} name="password" />
          </div>

          <div>
            <label for="password2">Confirm Password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password_confirmation"
            />
          </div>

          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div>
          <p>
            Already have an account?
            <a href="/login" class="text-laravel">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
