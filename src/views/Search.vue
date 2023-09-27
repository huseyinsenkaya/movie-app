<template>
  <div class="mb-10">
    <input
      class="w-full h-14 rounded p-4 text-2xl outline-none bg-slate-800 text-white"
      placeholder="Search by title"
      type="text"
      v-model="search"
      autofocus
    />
  </div>
  <div v-if="loading" class="mb-4 p-4 text-white text-2xl">Loading...</div>
  <MovieList v-else :movies="movies" />
</template>

<script setup>
  import MovieList from "../components/MovieList.vue";
  import useMovieSearch from "../composables/useMovieSearch";

  const { search, movies, loading } = useMovieSearch();
</script>
