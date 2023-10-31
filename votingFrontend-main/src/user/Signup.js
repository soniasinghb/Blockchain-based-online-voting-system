import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    voterID: "",
    walletAddress: "",
    name: "",
    fathername: "",
    mothername: "",
    gender: "",
    address: "",
    DOB: "",
    age: "",
    constituency: "",
    password: "",
    error: "",
    success: false
  });

  const { voterID, walletAddress, name, fathername, mothername, gender, address, DOB, age, constituency, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ voterID, walletAddress, name, fathername, mothername, gender, address, DOB, constituency, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            voterID: "",
            walletAddress: "",
            name: "",
            fathername: "",
            mothername: "",
            gender: "",
            address: "",
            DOB: "",
            age: "",
            constituency: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">voterID</label>
              <input
                className="form-control"
                onChange={handleChange("voterID")}
                type="text"
                value={voterID}
              />
            </div>
            <div className="form-group">
              <label className="text-light">walletAddress</label>
              <input
                className="form-control"
                onChange={handleChange("walletAddress")}
                type="text"
                value={walletAddress}
              />
            </div>
            <div className="form-group">
              <label className="text-light">name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">fathername</label>
              <input
                className="form-control"
                onChange={handleChange("fathername")}
                type="text"
                value={fathername}
              />
            </div>
            <div className="form-group">
              <label className="text-light">mothername</label>
              <input
                className="form-control"
                onChange={handleChange("mothername")}
                type="text"
                value={mothername}
              />
            </div>
            <div className="form-group">
              <label className="text-light">gender</label>
              <input
                className="form-control"
                onChange={handleChange("gender")}
                type="text"
                value={gender}
              />
            </div>
            <div className="form-group">
              <label className="text-light">address</label>
              <input
                className="form-control"
                onChange={handleChange("address")}
                type="text"
                value={address}
              />
            </div>
            <div className="form-group">
              <label className="text-light">DOB</label>
              <input
                className="form-control"
                onChange={handleChange("DOB")}
                type="text"
                value={DOB}
              />
            </div>
            <div className="form-group">
              <label className="text-light">age</label>
              <input
                className="form-control"
                onChange={handleChange("age")}
                type="text"
                value={age}
              />
            </div>
            <div className="form-group">
              <label className="text-light">constituency</label>
              <input
                className="form-control"
                onChange={handleChange("constituency")}
                type="text"
                value={constituency}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;

// create table voter(voterID int Primary Key, walletAddress int unique, name varchar(30), fathername varchar(30), mothername varchar(30), gender char(1), address varchar(50), DOB DATE, age int, constituency varchar(15));
