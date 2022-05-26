import React from "react";

function SingleAlbum({ album }) {
  return (
    <p>
      {album.id} - {album.title}
    </p>
  );
}

export default SingleAlbum;
