import React,{useState, useEffect, useCallback} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Layout from './blocks/Layout.js';
import ArtistsPage from './components/ArtistsPage.js'; 
import ArtistDetailPage from './components/ArtistDetailPage.js';
import AlbumDetailPage from './components/AlbumDetailPage.js';
import TopAlbums from './components/TopAlbums.js';
import FavoriteAlbums from './components/FavoriteAlbums.js';
import NotFoundPage from './components/NotFoundPage.js';

import {fetchArtists,fetchTopAlbums} from './fetchMethods/fetchArtists.js';
import Bottleneck from "bottleneck";

export default function AppRouter(props) {
  const [artists,setArtists] = useState(null);
  const [artIds,setArtIds] = useState(null);
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  const [topAlbums,setTopAlbums] = useState(null);


// FAVORITE ALBUMS ***

  const addToFavorites = (e,addedAlbum) => {
    e.preventDefault();

    if (!localStorage.getItem('favoriteAlbums')) {
      setFavoriteAlbums([...favoriteAlbums,addedAlbum])
      localStorage.setItem('favoriteAlbums',JSON.stringify([...favoriteAlbums,addedAlbum]) )
    } else {
        if (!favoriteAlbums.includes(addedAlbum)) {
        setFavoriteAlbums([...favoriteAlbums,addedAlbum]);
        localStorage.setItem('favoriteAlbums',JSON.stringify([...favoriteAlbums,addedAlbum]))
      }  else {
        let updatedFavorites = favoriteAlbums.filter(_album => _album!== addedAlbum);
        setFavoriteAlbums(updatedFavorites)
        localStorage.setItem('favoriteAlbums',JSON.stringify(updatedFavorites))
      }
    }
  
  }

  // OBTAINING IDs

  useEffect(()=> {
   
    if (localStorage.getItem('favoriteAlbums')) {
      setFavoriteAlbums(JSON.parse(localStorage.getItem('favoriteAlbums')))
    }
    fetchData();
  },[])


  const fetchData = async () => {
    const data = await fetchArtists();
    setArtists(data);
    let onlyIds = [];
    data.forEach(_artist => {
      onlyIds = [...onlyIds, Number(_artist.id)]
    })
    setArtIds(onlyIds)
  }


  // TOP ALBUMS ***

const fetchAlbums =  useCallback(async (arr)=>  {
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 700
  });

  let obtData = []

  arr.forEach( async (id) => {
 
    // ---------------------BOTTLENECK------------------------

    const res= await limiter.schedule(()=> fetchTopAlbums(id)) 
    let updRes = res.data[0]
    
        obtData = obtData.concat(updRes)

      localStorage.setItem('topAlbums',JSON.stringify(obtData))
      setTopAlbums(obtData)
   
  });
      
},[]) 

useEffect(()=>{

  if (artIds !== null ) {
    if (  artIds.length === 50) {
      if (!JSON.parse(localStorage.getItem('topAlbums'))  ) {
        fetchAlbums(artIds.slice(0,6))
      } else {

        if (JSON.parse(localStorage.getItem('topAlbums')).length <6) {
          fetchAlbums(artIds.slice(0,6))
        } else {
          setTopAlbums(JSON.parse(localStorage.getItem('topAlbums')))
        }
      }
      
    }
  }
 
},[artIds,fetchAlbums]);

 



  return (
    <div className="app-router">
      <Router>
        <Layout>
          <Switch>
            <Route exact path={['/artists','/']}  render={(routeProps)=> 
              <ArtistsPage {...routeProps} artists ={artists}/>} />

            <Route exact path= '/artists/:artistId' render={(routeProps)=> 
              <ArtistDetailPage {...routeProps}  favoriteAlbums = {favoriteAlbums}  />}/>

            <Route exact path= '/artists/:artistId/albums/:albumId' render={(routeProps)=>
              <AlbumDetailPage {...routeProps} favoriteAlbums = {favoriteAlbums} addAlbum={addToFavorites} />}/>

            <Route exact path='/albums' render={(routeProps)=> 
              <TopAlbums {...routeProps}  topAlbums={topAlbums} favoriteAlbums = {favoriteAlbums} />}/>

            <Route exact path='/favorites' render={(routeProps)=> 
              <FavoriteAlbums {...routeProps}  favoriteAlbums = {favoriteAlbums} />}/>
            
            <Route path='/404' component={NotFoundPage}/>
            <Redirect to='/404' />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};
