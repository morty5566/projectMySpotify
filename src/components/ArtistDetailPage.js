import React, {useState, useEffect} from 'react';
import {fetchArtistsDetail} from '../fetchMethods/fetchArtists.js';
import ArtistProfile from './ArtistProfile.js';
import {Link} from 'react-router-dom';
import AlbumDetail from './AlbumDetail.js';
import {Button} from 'react-bootstrap';

export default  function ArtistDetailPage(props) {
  const {match, favoriteAlbums} = props;
  const [artDetail, setArtDetail] = useState(null)

 
 

  useEffect(()=>{
     fetchData() 
  },[]);

  const fetchData = async () => {
    const response = await fetchArtistsDetail(match.params.artistId);
    setArtDetail(response);
  }



  return (
    <div>
      {artDetail ?
      <div className='artist-detail-page'>
       
        <div>
          <ArtistProfile  name={artDetail.artist.name}  photo={artDetail.artist.photo} id={artDetail.artist.id} />
          <h4>List of Albums:</h4>
          {artDetail.albums.map((album,idx) => {
          return <Link to={`/artists/${match.params.artistId}/albums/${album.id}`} key={`key-${album.id}`}>
            <AlbumDetail favoriteAlbums={favoriteAlbums} title={album.title} id={album.id} relDate={album.release_date}/></Link>
           })}
          <Link to='/artists'><Button variant='dark'>Back</Button></Link>
        </div> 
        
        
      </div>
      : 
      <div className='loader'></div>}
    </div>
      
  )
}