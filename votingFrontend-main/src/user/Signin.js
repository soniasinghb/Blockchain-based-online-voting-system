import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    voterID: "105",
    password: "test123",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { voterID, password, error, loading, didRedirect } = values;
  // const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    console.log(values);
    signin({ voterID, password })
      .then(data => {
        console.log(data);
        if (data.success === 0) {
          setValues({ ...values, error: data.data, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch((err) => console.log(err))
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/vote" />;
    }
    // if (isAutheticated()) {
    //   return <Redirect to="/" />;
    // }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: values.error ? "" : "none" }}
          >
            {values.error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">voterID</label>
              <input
                onChange={handleChange("voterID")}
                value={voterID}
                className="form-control"
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
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

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
