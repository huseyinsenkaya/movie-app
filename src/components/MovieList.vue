<template>
  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
  >
    <div
      class="relative group transition-transform transition-gpu hover:scale-105 cursor-pointer"
      v-for="movie in movies"
      :key="movie.id"
      @click="navigateMovieDetails(movie.id)"
    >
      <img
        class="rounded-md h-auto w-full"
        :src="baseUrl + movie.poster_path"
        alt="Movie Poster"
      />

      <div
        class="absolute overflow-y-auto rounded-md inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-opacity opacity-0 group-hover:opacity-100 p-4"
      >
        <h3 class="text-white text-xl font-semibold">{{ movie.title }}</h3>
        <p class="text-gray-300 text-sm mt-2">
          Release Date: {{ movie.release_date }}
        </p>
        <p class="text-gray-300 text-sm mt-2">
          IMDb:
          <span class="bg-yellow-500 text-black min-w-[12px] px-1 rounded-md">
            {{ movie.vote_average }}</span
          >
        </p>
        <p class="text-gray-300 text-xs mt-3">{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps(["movies"]);
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  const baseUrl = ref("https://image.tmdb.org/t/p/w780");

  const router = useRouter();

  const navigateMovieDetails = (id) => {
    router.push({ name: "movie-details", params: { id } });
  };
</script>
