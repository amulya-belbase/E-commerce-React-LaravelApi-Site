import react from "react";
import './App.css';
import Header from "./components/header.js";
import Body from "./components/body.js";
import Footer from "./components/footer.js";
// import Login from "./components/login.js";
// import Register from "./components/register.js";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Redirect,
// } from "react-router-dom";

function App() {
  return (
    // <Router>
      <div>
      <Header />
      <Body />
      <Footer />
      
      {/* <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Routes> */}
      
    </div>
    // </Router>
    
    
  );
}

export default App;
