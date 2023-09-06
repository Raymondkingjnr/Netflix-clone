// export const API_KEY = "import.meta.env.VITE_API_KEY";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const MOVIE_URL = "https://image.tmdb.org/t/p/w500/";

//  https://api.themoviedb.org/3/discover/movie?api_key=e002f08f46e0049891b3812857957fab&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreForURL}`);
const links = [
  {
    link: "Home",
    path: "/",
  },
  {
    link: "Tv Series",
    path: "/tv-series",
  },
  {
    link: "Movies",
    path: "/movies",
  },
  {
    link: "My List",
    path: "/my-list",
  },
];
export default links;
