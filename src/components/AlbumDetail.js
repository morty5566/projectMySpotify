import React, {useState,useEffect} from 'react';
import {format, differenceInCalendarDays} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {faHeart as solidHeart} from '@fortawesome/free-regular-svg-icons'


export default function AlbumDetail(props) {
  const {id, title, relDate, coverImg, favoriteAlbums} = props;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect (()=>{
    if (favoriteAlbums) {

      if (favoriteAlbums.includes(title)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
 
  },[favoriteAlbums,title])

  return (
    <div className='album-detail'>
      
      {coverImg && <img alt='album-image' src={coverImg}/> }

      {favoriteAlbums ? 
      <h5>{id}. {title} {isFavorite ? <FontAwesomeIcon icon={faHeart}/> :<FontAwesomeIcon icon={solidHeart}/> }</h5>
      : 
      <h5>{id}. {title} </h5>}

      {relDate && <p>Release date: {format(new Date(relDate),'dd. MMMM yyyy') }
      {` `}({differenceInCalendarDays(new Date(),new Date(relDate))} days ago)</p> }
    
    </div>
  )
}