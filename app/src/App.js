import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import { UpdateUser } from "./components/UpdateUser";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import axios from "axios";
import {
  Button,
  InputGroup,
  Toaster,
  Position,
} from "@blueprintjs/core";

const AppToaster = Toaster.create({
  position: Position.TOP,
})

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameQuery, setNameQuery] = useState("");
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newWebsite, setNewWebsite] = useState("")
  const [newCompany, setNewCompany] = useState("")

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("https://jsonplaceholder.typicode.com/users");

        let allData = res.data.filter((data) => {
          if (nameQuery) {
            return data.name.toLowerCase().includes(nameQuery.toLowerCase());
          }
          else {
            return data;
          }
        });
        setData(allData);

      } catch (e) {
        console.log("e: ", e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [nameQuery]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const addUser = () => {
    const name = newName.trim();
    const email = newEmail.trim();
    const phone = newPhone.trim();
    const website = newWebsite.trim();
    const company = newCompany.trim();
    if (name && email && phone && website && company) {
      const newUser = {
        id: data.length + 1,
        name,
        email,
        phone,
        website,
        company,
      };

      setData([...data, newUser]);
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setNewWebsite("");
      setNewCompany("");

      AppToaster.show({
        message: "User added successfully",
        intent: "success",
        timeout: 3000,
      });
    }
  };

  const updateUser = (id) => {
    const userToUpdate = data.find((user) => user.id === id);
  
    if (userToUpdate) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => {
          AppToaster.show({
            message: "User updated successfully",
            intent: "success",
            timeout: 3000,
          });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          AppToaster.show({
            message: "Error updating user",
            intent: "danger",
            timeout: 3000,
          });
        });
    }
  };

  const deleteUser = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        setData(values => {
          return values.filter(item => item.id !== id)
        })
        AppToaster.show({
          message: "User deleted successfully",
          intent: "success",
          timeout: 3000,
        })
      })
  }

  const onChangeHandler = (id, key, value) => {
    setData(values => {
      return values.map(item =>
        item.id === id ? { ...item, [key]: value } : item
      )
    })
  }

  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <nav className="navbar navbar-expand navbar-dark bg-info">
        <a href="/" className="navbar-brand">
           Contact
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link exact to={"/add/"} className="nav-link">
              Create Contact
            </Link>
          </li>
        </div>
      </nav>
      <div className="container m-10">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add/" element={<AddUser />} />
          <Route path="/contact/:id/update/" element={<UpdateUser />} />
        </Routes>
      </div>
      <h1>Search For Contact Info</h1>

      <input
        name="search"
        className="search__input"
        onChange={(e) => setNameQuery(e.target.value)}
        value={nameQuery}
        type="text"
        placeholder="search by name"
      />
      <div>
        {data.map((user) => (
          <List user={user} key={user.id} setData={setData} />
        ))}
      </div>
    </div>
  )
}

const List = ({ setData, user }) => {
  const { name, email, phone, website, company } = user;

  return (
    <>
      <div className="contact__container">
        <div className="contact__item">
          <span className="bold">Name:</span> {name}
        </div>
        <div className="contact__item">
          <span className="bold">Email: </span>
          {email}
        </div>
        <div className="contact__item">
          <span className="bold">Phone: </span>
          {phone}
        </div>
        <div className="contact__item">
          <span className="bold">Website:</span>
          {website}
        </div>
        <div className="contact__item">
          <span className="bold">Company Name:</span>
          {company.name}
        </div>
      </div>
    </>
  );
};
