import React from 'react';


export default function FavoriteAlbums(props) {
  const {favoriteAlbums} = props;

  return (
    <div className='favorite-albums'>
      <h1>My Favorite Albums</h1>
      {favoriteAlbums.map((fAlbum,idx)=> {
        return <h5 key={`key-${idx+1}`} id={idx}>{idx+1}. {fAlbum}</h5>
      })}
    </div>
  )
}