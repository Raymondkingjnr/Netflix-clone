import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";
import { addLikedMovie, fetchLikedMovies, deleteLikedMovie } from "../firebase";

const initialState = {
  movies: [],
  MyList: [],
  genresLoading: false,
  genres: [],
  query: "",
  isSidebarOpen: false,
  error: "",
};

/////////////////////////

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

////////////////////////////

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
        text: movie.overview,
        posters: movie.poster_path,
      });
    }
  });
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    try {
      // Dispatch the getGenres thunk to fetch genre information
      await dispatch(getGenres);
      const allResults = [];

      // Get the fetched genres from the Redux state
      const genres = getState().netflex.genres;

      // Fetch data from 50 pages
      for (let i = 1; allResults.length < 100 && i < 10; i++) {
        const resp = await axios(
          `${TMDB_BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&with_watch_monetization_types=flatrate&page=${i}`
        );
        const { results } = resp.data;

        allResults.push(...results);
      }
      // Call createArrayFromRawData to process the fetched data
      const processedMovies = [];
      createArrayFromRawData(allResults, processedMovies, genres);

      return processedMovies;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchMoviesbyGenres = createAsyncThunk(
  "netflix/fetchMoviesbyGenres",
  async ({ genre, type }, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;

    try {
      // Dispatch the getGenres thunk to fetch genre information
      await dispatch(getGenres);

      const allResults = [];

      // Fetch data from 50 pages
      for (let i = 1; allResults.length < 100 && i < 10; i++) {
        const resp = await axios(
          `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&with_watch_monetization_types=flatrate&page=${i}&with_genres=${genre}`
        );

        const { results } = resp.data;

        allResults.push(...results);
      }

      // Get the fetched genres from the Redux state
      const genres = getState().netflex.genres;

      // Call createArrayFromRawData to process the fetched data
      const processedMovies = [];
      createArrayFromRawData(allResults, processedMovies, genres);
      return processedMovies;
    } catch (error) {
      return console.log(error);
    }
  }
);

//  ///// fetchSearch

export const fetchMoviesbySearch = createAsyncThunk(
  "netflix/fetchMoviesbySearch",
  async ({ type }, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const query = getState().netflex.query;

    try {
      // Dispatch the getGenres thunk to fetch genre information
      await dispatch(getGenres);

      const allResults = [];

      // Fetch data from 50 pages
      for (let i = 1; allResults.length < 100 && i < 10; i++) {
        const resp = await axios(
          `${TMDB_BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&query=${query}include_video=false&with_watch_monetization_types=flatrate&page=${i}`
        );

        const { results } = resp.data;

        allResults.push(...results);
      }

      // Get the fetched genres from the Redux state
      const genres = getState().netflex.genres;

      // Call createArrayFromRawData to process the fetched data
      const processedMovies = [];
      createArrayFromRawData(allResults, processedMovies, genres);
      return processedMovies;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchLikedMoviesAsync = createAsyncThunk(
  "likedMovies/getlikedMovies",
  async () => {
    const likedMovies = await fetchLikedMovies();
    return likedMovies;
  }
);

export const addLikedMoviesAsync = createAsyncThunk(
  "likedMovies/addLikedMovie",
  async (movie, { dispatch }) => {
    const movieId = await addLikedMovie(movie);
    dispatch(fetchLikedMoviesAsync());
    return movieId;
  }
);

export const deleteLikedMovieAsync = createAsyncThunk(
  "likedMovies/deleteLikedMovie",
  async (newId, { dispatch }) => {
    try {
      await deleteLikedMovie(newId);
      dispatch(fetchLikedMoviesAsync());
      // console.log("Deleting movie with ID:", newId, "was successful");
      return newId;
    } catch (error) {
      console.error("E Deleting movie", error);
      throw error;
    }
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoading = false;
    });
    builder.addCase(fetchMoviesbyGenres.fulfilled, (state, action) => {
      // console.log(action);
      state.movies = action.payload;
      state.genresLoading = false;
    });
    builder.addCase(fetchMoviesbySearch.fulfilled, (state, action) => {
      // console.log(action);
      state.movies = action.payload;
      state.genresLoading = false;
    });
    builder.addCase(fetchLikedMoviesAsync.fulfilled, (state, action) => {
      // console.log(action);
      state.MyList = action.payload;
      state.genresLoading = false;
    });
    builder.addCase(deleteLikedMovieAsync.fulfilled, (state, action) => {
      // Remove the deleted movie from the state
      // console.log(action);
      state.MyList = state.MyList.filter(
        (movie) => movie.id !== action.payload
      );
    });
  },
});

export const { toggleSidebar, handleChange, setQuery } = NetflixSlice.actions;

export default NetflixSlice.reducer;
