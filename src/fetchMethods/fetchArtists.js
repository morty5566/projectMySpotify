import fetch from 'node-fetch';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
const http = rateLimit(axios.create(), { maxRequests:1, perMilliseconds: 700, maxRPS: 1 })


export  async function fetchArtists() {
  const response = await fetch('https://5f46c706aaaf9a0016151188.mockapi.io/api/artist')
                    .then(res=> res.json())
                    .then(json=> json);

  return response;
}


export  async function fetchArtistsDetail(id) {
  const response= {}
    response.artist= await fetch(`https://5f46c706aaaf9a0016151188.mockapi.io/api/artist/${id}`)
                    .then(res=> res.json())
                    .then(json=> json);

    response.albums =  await fetch(`https://5f46c706aaaf9a0016151188.mockapi.io/api/artist/${id}/albums`)
                      .then(res=> res.json())
                      .then(json=> json);
  
  return response;
}

// const delay = interval => new Promise(resolve => setTimeout(resolve, interval));

export  function fetchTopAlbums(id) {
  const response =  http.get(`https://5f46c706aaaf9a0016151188.mockapi.io/api/artist/${id}/albums`)
                    .then(res=> res);
                          
  return response;
    
}


export  async function fetchAlbum(artistId,albumId) {
     
  const response = await fetch(`https://5f46c706aaaf9a0016151188.mockapi.io/api/artist/${artistId}/albums/${albumId}`)
                    .then(res=> res.json())
                    .then(json=> json);
  return response;
}