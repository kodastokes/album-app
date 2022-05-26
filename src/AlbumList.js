import React from "react";
import SingleAlbum from "./SingleAlbum.js";

function AlbumList({ user = {}, albums }) {
  console.log(user);

  let albumList = albums.map((album, index) => (
    <SingleAlbum key={index} album={album} />
  ));

  if (albumList.length > 0) {
    return (
      <div>
        <h2> {user.name} Albums </h2>
        <div> {albumList} </div>
      </div>
    );
  } else return <p>Please click on a user name to the left</p>;
}

export default AlbumList;
