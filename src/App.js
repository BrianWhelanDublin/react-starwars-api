import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)


  const fetchMoviesAsync = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("https://swapi.dev/api/films")
      if (!res.ok) {
        throw new Error("Something went wrong")
      }

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
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesAsync();
  }, [fetchMoviesAsync])

  let content = <p>Click for movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }

  if (loading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesAsync}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
