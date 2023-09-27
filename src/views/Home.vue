<template>
  <div class="text-white" v-if="loading">...Loading</div>
  <MovieList v-else :movies="movies" />
</template>

<script setup>
  //hooks
  import useFetchMovies from "../composables/useFetchMovies";
  //components
  import MovieList from "../components/MovieList.vue";

  const { movies, loading } = useFetchMovies();
</script>
