import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

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
    setError(null)
    try {
      const res = await fetch(process.env.REACT_APP_FIREBASE_URL)
      if (!res.ok) {
        throw new Error("Something went wrong")
      }

      const data = await res.json();
      console.log(data)

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const addMovieHandler = async (movie) => {
    const res = await fetch(process.env.REACT_APP_FIREBASE_URL, {
      method: "POST",
      body: JSON.stringify(movie),
      header: {
        "Content-type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
  }

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesAsync}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
