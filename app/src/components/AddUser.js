import axios from "axios";
import React, { useState } from "react";
import { baseURL, headers } from "./../services/user.service";

export const AddUser = () => {
  const initialUserState = {
    id: null,
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitUser = () => {
    let data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company,
    };

    axios
      .post(`${baseURL}/user/`, data)
      .then((response) => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          website: response.data.website,
          company: response.data.company,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            User Added!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleUserChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleUserChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={user.phone}
              onChange={handleUserChange}
              name="phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              className="form-control"
              id="website"
              required
              value={user.website}
              onChange={handleUserChange}
              name="website"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              required
              value={user.company}
              onChange={handleUserChange}
              name="company"
            />
          </div>

          <button
            type="submit"
            onClick={submitUser}
            className="btn btn-success mt-2"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};