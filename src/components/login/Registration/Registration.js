import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/UserContext";
import "./Registration.css";

const Registration = () => {
  const [error, setError] = useState(null);
  const { createUser, setUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    if (password !== confirm) {
      setError("Your Password did not match");
      return;
    }

    //create user with email and password
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        form.reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" required />
        </div>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      <p>
        Already Have an Account <Link to="/login">Registration</Link>
      </p>
      <p className="text-error">{error}</p>
    </div>
  );
};

export default Registration;
