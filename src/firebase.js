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
  try {
    // Check if a movie with the same ID already exists
    const moviesCollection = collection(db, "likedMovies");
    const q = query(moviesCollection, where("id", "==", movie.id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      // If no movie with the same ID exists, add the movie
      const docRef = await addDoc(moviesCollection, movie);
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

export const deleteLikedMovie = async (newId) => {
  // console.log("Movie ID", newId);
  try {
    await deleteDoc(doc(db, "likedMovies", newId));
    toast.success("Movie removed successfully");
  } catch (error) {
    console.error("Error deleting movie: ", error);
  }
};

// export const deleteLikedMovie = async (movieId) => {
//   console.log("Movie ID", id);
//   try {
//     const movieRef = collection(db, "likedMovies", movieId);
//     await movieRef.deleteDoc();
//     toast.success("Movie deleted successfully");
//   } catch (error) {
//     console.error("Error deleting movie: ", error);
//   }
// };

// export const deleteLikedMovie = async (id) => {
//   console.log("Movie ID", id);
//   try {
//     const movieDoc = doc(db, "likedMovies", id);
//     toast.success("Movie deleted successfully");
//     await deleteDoc(movieDoc);
//   } catch (error) {
//     console.log("error deleting movie", error);
//   }
// };

export const fetchLikedMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "likedMovies"));
    const likedMovies = [];
    querySnapshot.docs.map((doc) => {
      likedMovies.push({ newId: doc.id, ...doc.data() });
    });
    // console.log(likedMovies);
    return likedMovies;
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};
