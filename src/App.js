import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch example
  // const fetchMovies = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then(res => res.json())
  //     .then(data => {
  //       const moviesList = data.results.map(movie => {
  //         return {
  //           id: movie.episode_id,
  //           title: movie.title,
  //           openingText: movie.opening_crawl,
  //           releaseDate: movie.release_date
  //         }
  //       })
  //       setMovies(moviesList)
  //     })
  //     .catch(error => console.log(error.message))
  // }

  // async await example
  const fetchMoviesAsync = async () => {
    setLoading(true)
    const res = await fetch("https://swapi.dev/api/films")
    const data = await res.json();
    const moviesList = data.results.map(movie => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date
      }
    })
    setLoading(false)
    setMovies(moviesList)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesAsync}>Fetch Movies</button>
      </section>
      <section>
        {!loading && movies.length === 0 && <p>Click to load movies</p>}
        {loading && <p>Loading...</p>}
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}



      </section>
    </React.Fragment>
  );
}

export default App;
