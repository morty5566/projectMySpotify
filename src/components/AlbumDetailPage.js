import React, {useState, useEffect} from 'react';
import { fetchAlbum } from '../fetchMethods/fetchArtists.js';
import AlbumDetail from './AlbumDetail.js';
import {Button} from 'react-bootstrap';


export default  function AlbumDetailPage(props) {
  const {match, addAlbum, favoriteAlbums} =props;
  const [currAlbum,setCurrAlbum] = useState(null);


  const goBack = (e) => {
    e.preventDefault();
    props.history.push(`/artists/${match.params.artistId}`)
  }

 
  useEffect(()=>{
   fetchData()
  },[]);

  const fetchData = async () => {
      const response = await fetchAlbum(match.params.artistId,match.params.albumId);
      setCurrAlbum(response);
  };




  return (
      <div className='album-detail-page'>
        {currAlbum!==null ?
          <div>
            <AlbumDetail favoriteAlbums={favoriteAlbums} id = {currAlbum.id} 
            title={currAlbum.title} relDate={currAlbum.release_date} coverImg={currAlbum.cover_image}/>
            <Button className='buttons' variant='outline-success' onClick={(e)=> addAlbum(e,currAlbum.title)} >Add to Favorites</Button>
            <Button className='buttons' variant='outline-danger' onClick={goBack}>Back to the Artist</Button>
          </div>
        :
        <div className='loader'></div>}
      </div>
  )
}