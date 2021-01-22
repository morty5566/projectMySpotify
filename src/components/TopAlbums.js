import React from 'react';
import AlbumDetail from './AlbumDetail.js';


export default function TopAlbums(props) {
const {topAlbums} = props;


  return (
    <div >
      {topAlbums !== null && topAlbums.length ===6 ? 
        <div className='top-albums'>
         <h1>Top Albums:</h1>
         {topAlbums.map((album,idx)=> {
          
          return <AlbumDetail key={`key-${idx}`} title={album.title} id={album.id}/>
         })}
          
        </div> : 
      
        <div className='loader'>
        
        </div>}
    </div>
  )
}
