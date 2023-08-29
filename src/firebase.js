import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./utils/firebase-config";
import { toast } from "react-toastify";

export const addLikedMovie = async (movie) => {
  //   if (!movie.id || !movie.title || !movie.genre || !movie.date) {
  //     console.error("Error adding movie: Invalid data");
  //     return null;
  //   }
  try {
    // Check if a movie with the same ID already exists
    const moviesCollection = collection(db, "likedMovies");
    const q = query(moviesCollection, where("id", "==", movie.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      const movieToAdd = {
        id: movie.id,
        date: movie.date || "",
      };
      // If no movie with the same ID exists, add the movie
      const docRef = await addDoc(moviesCollection, movieToAdd);
      toast.success("Movie Added To Your List");
      return docRef.id;
    } else {
      // Movie with the same ID already exists, return without adding it again
      toast.error("Movie Already In You List");
      return null; // You can return null or some other value to indicate it wasn't added
    }
  } catch (error) {
    console.error("Error adding movie: ", error);
  }
};

export const deleteLikedMovie = async (movieId) => {
  try {
    await deleteDoc(doc(db, "likedMovies", movieId));
  } catch (error) {
    console.error("Error deleting movie: ", error);
  }
};

export const fetchLikedMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "likedMovies"));
    const likedMovies = [];
    querySnapshot.forEach((doc) => {
      likedMovies.push({ id: doc.id, ...doc.data() });
    });
    // console.log(likedMovies);
    return likedMovies;
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};

// try {
//     const docRef = await addDoc(collection(db, "likedMovies"), movie);
//     console.log("Document added with ID: ", docRef.id);
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding movie: ", error);
//   }
