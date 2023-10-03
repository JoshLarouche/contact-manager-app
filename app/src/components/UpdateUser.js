import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL, headers } from "./../services/user.service";

export const UpdateUser = () => {
  const initialUserState = {
    id: null,
    name: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  };

  let { id } = useParams();

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    retrieveUser();
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const retrieveUser = () => {
    axios
      .get(`${baseURL}/user/${id}/`)
      .then((response) => {
        setCurrentUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          website: response.data.website,
          company: response.data.company,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateUser = () => {
    let data = {
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      website: currentUser.website,
      company: currentUser.company,
    };

    axios
      .put(`${baseURL}/user/${id}/`, data)
      .then((response) => {
        setCurrentUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          website: response.data.website,
          company: response.data.company,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const newUser = () => {
    setCurrentUser(initialUserState);
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
            User Updated!
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
            Update
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
              value={currentUser.name}
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
              value={currentUser.email}
              onChange={handleUserChange}
              name="email"
              default
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              required
              value={currentUser.phone}
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
              value={currentUser.website}
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
              value={currentUser.company}
              onChange={handleUserChange}
              name="company"
            />
          </div>

          <button onClick={updateUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};