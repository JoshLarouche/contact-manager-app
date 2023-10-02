import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import { UpdateUser } from "./components/UpdateUser";
import "./styles.css";
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
        console.log("allData: ", allData);
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

  // const addUser = () => {
  //   const name = newName.trim()
  //   const email = newEmail.trim()
  //   const website = newWebsite.trim()
  //   if (name && email && website) {
  //     fetch("https://jsonplaceholder.typicode.com/users", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         website,
  //       }),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(data2 => {
  //         setData([...data, data2])
  //         setNewName("")
  //         setNewEmail("")
  //         setNewWebsite("")
  //         AppToaster.show({
  //           message: "User added successfully",
  //           intent: "success",
  //           timeout: 3000,
  //         })
  //       })
  //   }
  // }
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
      <nav className="navbar navbar-expand navbar-dark bg-info">
            <a href="/" className="navbar-brand">
              Restaurant User
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link exact to={"/add/"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container m-10">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/add/" element={<AddUser />} />
              <Route path="/user/:id/update/" element={<UpdateUser />} />
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
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => onChangeHandler(user.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => onChangeHandler(user.id, 'email', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => onChangeHandler(user.id, 'phone', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.website}
                    onChange={(e) => onChangeHandler(user.id, 'website', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={user.company.name}
                    onChange={(e) => onChangeHandler(user.id, 'company', e.target.value)}
                  />
                </td>
                <td>
                  <Button intent="primary" onClick={() => updateUser(user.id)}>
                    Update
                  </Button>
                  &nbsp;
                  <Button intent="danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <InputGroup
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="Add name here..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Add email here..."
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Add phone here..."
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Add website here..."
                  value={newWebsite}
                  onChange={e => setNewWebsite(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Add company here..."
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={addUser}>
                  Add user
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
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
