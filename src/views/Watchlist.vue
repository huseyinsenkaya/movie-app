<template>
  <MovieList :movies="movies" />
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { getFirestore, getDoc, doc } from "firebase/firestore";
  import MovieList from "../components/MovieList.vue";
  import { onAuthStateChanged, getAuth } from "firebase/auth";
  import router from "../router";

  const firestore = getFirestore();

  const movies = ref([]);

  onMounted(() => {
    getCurrentWatchlist();
  });

  const getCurrentWatchlist = async () => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const querySnapshot = await getDoc(doc(firestore, "users", user.uid));
        movies.value = [...querySnapshot.data().watchlist];
      } else {
        router.push("/login");
      }
    });
  };
</script>
