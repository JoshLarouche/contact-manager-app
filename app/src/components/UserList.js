import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { baseURL } from "./../services/user.service";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);

  const { isAuthenticated } = useAuth0();

  // Wrap retrieveAllUsers in useCallback
  const retrieveAllUsers = useCallback(() => {
    axios
      .get(`${baseURL}/contact/`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [users]); // No dependencies needed for useCallback

  const deleteUser = (id) => {
    axios
      .delete(`${baseURL}/contact/${id}/`)
      .then((response) => {
        setDeleted(true);
        retrieveAllUsers();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    retrieveAllUsers();
  }, [retrieveAllUsers]); // Empty dependency array, so it only runs once

  const handleUpdateClick = (id) => {
    navigate(`/contact/${id}/update/`);
  };
  return (
    <div className="row justify-content-center">
      <div className="col">
        {deleted && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            User deleted!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {users &&
          users.map((user) => (
            <div key={user.id} className="card my-3 w-25 mx-auto">
              <div className="card-body">
                <h2 className="card-title font-weight-bold">{user.name}</h2>
                <p className="card-text">{user.email}</p>
                <p className="card-text">{user.phone}</p>
                <p className="card-text">{user.website}</p>
                <p className="card-text">{user.company}</p>
              </div>
              <div className="card-footer">
                <div
                  className="btn-group justify-content-around w-75 mb-1 "
                  data-toggle="buttons"
                >
                  {isAuthenticated && ( // Check if the user is authenticated
                    <>
                      <span>
                        <button
                          className="btn btn-info"
                          onClick={() => handleUpdateClick(user.id)}
                        >
                          Update
                        </button>
                      </span>
                      <span>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { baseURL, headers } from "./../services/user.service";
// import { useNavigate } from "react-router-dom";

// export const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   const [deleted, setDeleted] = useState(false);

//   const retrieveAllUsers = () => {
//     axios
//       .get(`${baseURL}/user/`, {
//         headers: {
//           headers,
//         },
//       })
//       .then((response) => {
//         setUsers(response.data);
//         console.log(users);
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };

//   const deleteUser = (id) => {
//     axios
//       .delete(`${baseURL}/user/${id}/`, {
//         headers: {
//           headers,
//         },
//       })
//       .then((response) => {
//         setDeleted(true);
//         retrieveAllUsers();
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };


//   useEffect(() => {
//     retrieveAllUsers();
//   }, [retrieveAllUsers]);

//   const handleUpdateClick = (id) => {
//     navigate(`/user/${id}/update/`);
//   };
//   return (
//     <div className="row justify-content-center">
//       <div className="col">
//         {deleted && (
//           <div
//             className="alert alert-danger alert-dismissible fade show"
//             role="alert"
//           >
//             User deleted!
//             <button
//               type="button"
//               className="close"
//               data-dismiss="alert"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//         )}

//         {users &&
//           users.map((user) => (
//             <div key={user.id} className="card my-3 w-25 mx-auto">
//               <div className="card-body">
//                 <h2 className="card-title font-weight-bold">{user.name}</h2>
//                 <p className="card-text">{user.email}</p>
//                 <p className="card-text">{user.phone}</p>
//                 <p className="card-text">{user.website}</p>
//                 <p className="card-text">{user.company}</p>
//               </div>
//               <div className="card-footer">
//                 <div
//                   className="btn-group justify-content-around w-75 mb-1 "
//                   data-toggle="buttons"
//                 >
//                   <span>
//                     <button
//                       className="btn btn-info"
//                       onClick={() => handleUpdateClick(user.id)}
//                     >
//                       Update
//                     </button>
//                   </span>
//                   <span>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteUser(user.id)}
//                     >
//                       Delete
//                     </button>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };