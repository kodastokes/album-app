import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);
  let originalTitle = document.title;

  useEffect(() => {
    const abortController = new AbortController();
    async function loadUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`,
          { signal: abortController.signal }
        );
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadUsers();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadAlbums() {
      try {
        if (currentUser.id) {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
            { signal: abortController.signal }
          );
          const albumsFromAPI = await response.json();
          setAlbums(albumsFromAPI);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadAlbums();
    return () => abortController.abort();
  }, [currentUser]);

  useEffect(() => {
    document.title = `Awesome Album App`;
    return () => (document.title = originalTitle);
  }, []);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} />
      </div>
    </div>
  );
}

export default App;
