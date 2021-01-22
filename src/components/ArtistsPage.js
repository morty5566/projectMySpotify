import React from 'react';
import ArtistProfile from './ArtistProfile.js';
import {Link} from 'react-router-dom';


export default  function ArtistsPage(props) {
  const {artists} = props;
 
  return (
    <div>
      {artists!==null ? 
        <div className='artists-page-parent' >
          <h1>My Spotify</h1>
          
          <div className='artists-page'>
            
            {artists.map((artist,idx) => {
              return <Link key={`id-code-${idx}`} to={`artists/${artist.id}`}>
                <ArtistProfile  name={artist.name}  photo={artist.photo} id={artist.id}/></Link>
            })}
          
          </div>
      
      </div>
     :
      <div className='loader'></div>
    }
    </div>
    
  )
}