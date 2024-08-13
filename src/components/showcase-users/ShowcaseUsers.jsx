import React, { useEffect, useState } from "react";
import "./ShowcaseUsers.css";
import UserCard from "../user-card/UserCard.jsx";
import { fetchUsers } from "../../utils/api-connector";

export default function UserShowcase() {
  const [userData, setUserData] = useState({});
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (!loadData) return;

    const loadUsers = async () => {
      try {
        const users = await fetchUsers(); // Use fetchUsers from api-connector
        setUserData(
          users.reduce((acc, user) => ({ ...acc, [user._id]: user }), {})
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, [loadData]);

  return (
    <>
      <main id="user">
        <button onClick={() => setLoadData(true)}>Load Users</button>
        <div className="user-container">
          {loadData &&
            Object.keys(userData).map((id) => (
              <UserCard key={id} id={id} {...userData[id]} />
            ))}
        </div>
      </main>
    </>
  );
}
