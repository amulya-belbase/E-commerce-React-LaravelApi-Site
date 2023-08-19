import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // useEffect(()=>{
  //   if(localStorage.getItem('vendor-info')){
  //     navigate('/');
  //   }
  // })

  // Determining the fields required
  const [formData, setFormData] = react.useState({
    email: "",
    password: "",
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
    // console.log(formData)
    if (formData.email == "" || formData.password == "") {
      alert("Fill In the credentials");
    } else {
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
      if(result.key == "Invalid Login"){
        alert("Invalid Login");
      }else{
      localStorage.setItem("vendor-info", JSON.stringify(result));
      alert("Login Successful");
      navigate('/');
    }}
  
  // if (!localStorage.getItem("vendor-info")) {
  //   alert("Invalid Login");
  // }
}

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginform">
        <div className="innerloginform">
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit">Log In</button>
          </div>

          <div>
            <p>
              Don't have an account?
              <a href="/registration">Register</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
