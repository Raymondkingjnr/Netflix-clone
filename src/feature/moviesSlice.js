import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  movies: [],
  genresLoading: false,
  genres: [],
};

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   const {
//     data: { genres },
//   } = await axios(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
//   return genres;
// });

// const createArrayFromRawData = (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genre) => {
//       const name = genres.find(({ id }) => id === genre);
//       if (name) movieGenres.push(name.name);
//     });
//     if (movie.backdrop_path) {
//       moviesArray.push({
//         id: movie.id,
//         name: movie?.original_name ? movie.original_name : movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 3),
//       });
//     }
//   });
// };

/////////////

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async (_, thunkAPI) => {
//     const { getState } = thunkAPI;
//     const { page, genres } = getState().netflex;

//     try {
//       const allResults = [];

//       // Fetch data from 50 pages
//       for (let i = 1; allResults.length < 50 && i < 10; i++) {
//         const resp = await axios(
//           `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=${genres}&page=${i}`
//         );
//         const { results } = resp.data;

//         allResults.push(...results);
//       }

//       return allResults;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const fetchMovies = createAsyncThunk(
//   "netflix/trending",
//   async (_, thunkAPI) => {
//     const { getState } = thunkAPI;
//     const { page, genres } = getState().netflex;

//     try {
//       const allResults = [];

//       // Fetch data from 50 pages
//       for (let i = 1; allResults.length < 50 && i < 10; i++) {
//         const resp = await axios(
//           `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&with_genres=${genres}&page=${i}`
//         );
//         const { results } = resp.data;

//         allResults.push(...results);
//       }

//       // Call createArrayFromRawData to process the fetched data
//       const processedMovies = [];
//       createArrayFromRawData(allResults, processedMovies, genres);

//       return processedMovies;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

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

      const { page } = getState().netflex;

      const allResults = [];

      // Fetch data from 50 pages
      for (let i = 1; allResults.length < 50 && i < 10; i++) {
        const resp = await axios(
          `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate&page=${i}`
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
      console.log(error);
    }
  }
);

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state) => {
        state.genresLoading = true;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoading = false;
      })
      .addCase(getGenres.rejected, (state, { payload }) => {
        state.genresLoading = true;
        toast.error(payload);
      })
      .addCase(fetchMovies.pending, (state) => {
        state.genresLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.genresLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, { payload }) => {
        state.genresLoading = true;
        toast.error(payload);
      });
  },
});

export default NetflixSlice.reducer;
