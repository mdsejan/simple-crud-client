import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (_id) => {
    console.log(_id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Succesfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
        }
      });
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-3xl font-semibold mb-5">Users</h2>
      <div>
        <ol className="">
          {users.map((user) => (
            <li key={user._id}>
              {user.name} : {user.email}
              <Link to={`/update/${user._id}`}>
                <button className="mx-8 btn bg-gray-400 p-1 hover:text-red-800 font-bold">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn px-3 py-2 bg-blue-600"
              >
                X
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Users;
