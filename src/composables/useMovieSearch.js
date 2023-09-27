import { ref, watch } from "vue";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export default function useMovieSearch() {
  const search = ref("");
  const movies = ref([]);
  const loading = ref(false);

  const debounce = (func, wait) => {
    let timeout;

    return (...args) => {
      const later = () => {
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const searchMovies = async () => {
    loading.value = true;
    const url = `https://api.themoviedb.org/3/search/movie?query=${search.value}&include_adult=false&language=en-US&page=1`;

    if (!search.value) {
      movies.value = [];
      loading.value = false;
      return;
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      movies.value = data.results;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  watch(
    search,
    debounce(() => searchMovies(), 500)
  );

  return {
    search,
    movies,
    loading,
  };
}
