import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameQuery, setNameQuery] = useState("");

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
        console.log(allData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [nameQuery]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
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
          <List user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

const List = ({ post, setData, user }) => {
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
