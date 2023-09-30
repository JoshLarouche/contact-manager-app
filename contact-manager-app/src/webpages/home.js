import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [users, setUsers] = useState([]);
useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setUsers(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])
if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {users.map(user => (
                    <div>
                        <h3>
                        Name: <Link to={`user/${user.id}`}>{user.name}</Link>
                        </h3>
                        <div>
                            Email: {user.email}
                        </div>
                        <div>
                            Phone: {user.phone}
                        </div>
                        <div>
                            Website: {user.website}
                        </div>
                        <div>
                            Company Name: {user.company.name}
                        </div>
                        {/* <div>
                            ------------------------------------------
                        </div> */}
                    </div>
                ))}
            </ul>
        );
    }
}
export default Home;