import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoading: false,
  genres: [],
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
        date: movie.release_date,
        posters: movie.poster_path,
      });
    }
  });
};

// const getRawData = async (api, genres, paging = false) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
//     const {
//       data: { results },
//     } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
//     createArrayFromRawData(results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async ({ type }, thunkAPI) => {
//     const {
//       netflix: { genres },
//     } = thunkAPI.getState();
//     return getRawData(
//       `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
//       genres,
//       true
//     );
//   }
// );

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
          `${TMDB_BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${i}`
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
          `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${i}&with_genres=${genre}`
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

export const getUserLikedMovies = createAsyncThunk(
  "netflix/getliked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);
export const removeFromLikedMovies = createAsyncThunk(
  "netflix/delete",
  async (email, movieId) => {
    const {
      data: { movies },
    } = await axios.put(`http://localhost:5000/api/user/delete`, {
      email,
      movieId,
    });
    return movies;
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
      // state.error = action.error.message;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoading = false;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.genresLoading = false;
    });
  },
});

export const { toggleSidebar, handleChange } = NetflixSlice.actions;

export default NetflixSlice.reducer;
