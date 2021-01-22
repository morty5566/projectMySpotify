import React from 'react';
import avatars from '../DATA/avatars.json';


export default function ArtistProfile(props) {

  const {photo,name,id} = props;

  return (
      <div  data={id} className='artist-profile'>
        {id && <img alt='artist' src={avatars[Number(id)-1].avatar} />}
        <h3>{name}</h3>
      </div>
  )
}