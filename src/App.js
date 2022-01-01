import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  // Fetch example
  const fetchMovies = () => {
    fetch("https://swapi.dev/api/films")
      .then(res => res.json())
      .then(data => {
        const moviesList = data.results.map(movie => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          }
        })
        setMovies(moviesList)
      })
      .catch(error => console.log(error.message))
  }

  // async await example
  const fetchMoviesAsync = async () => {
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
    setMovies(moviesList)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesAsync}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
