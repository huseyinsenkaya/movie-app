import { ref } from "vue";

const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export default function useFetchMovies() {
  const movies = ref([]);
  const loading = ref(false);

  const fetchMovies = async () => {
    loading.value = true;

    try {
      const response = await fetch(url);
      const data = await response.json();
      movies.value = data.results;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  fetchMovies();

  return {
    movies,
    loading,
  };
}
