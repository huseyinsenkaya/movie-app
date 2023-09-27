<template>
  <div class="text-white" v-if="isLoading">...Loading</div>
  <div v-else class="flex gap-10 w-full text-white mt-10">
    <div class="flex-1">
      <img
        class="w-full rounded-lg object-contain"
        :src="baseUrl + movieData?.backdrop_path"
        alt="Movie Poster"
      />
    </div>
    <div class="flex-1 flex flex-col justify-between">
      <h1 class="text-2xl">{{ movieData?.title }}</h1>

      <div class="flex text-xs mt-4 justify-between">
        <p>{{ movieData?.runtime }} min | {{ movieData?.release_date }}</p>
        <p>
          IMDb:
          <span class="bg-yellow-400 text-black min-w-[12px] px-1 rounded-md">
            {{ toFixed(movieData?.vote_average) }}
          </span>
        </p>
      </div>

      <div v-if="movieData?.tagline">
        <span class="italic">{{ movieData?.tagline }}</span>
      </div>

      <div class="mt-4">Starring: {{ starsName }}</div>

      <div>
        <h2 class="text-xl mt-10">Overview</h2>
        <p class="mt-2 italic">{{ movieData?.overview }}</p>
      </div>

      <div class="flex justify-end">
        <button
          v-if="!isAddedToWatchlist"
          @click="handleAddWatchlist"
          class="button mt-4 flex"
          type="button"
        >
          <PlusIcon class="h-5 w-5" /> Watchlist
        </button>
        <button
          @click="handleRemoveWatchList"
          type="button"
          class="button bg-red-500 mt-4 flex"
          v-else
        >
          <MinusIcon class="h-5 w-5" />
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import {
    getFirestore,
    doc,
    arrayUnion,
    getDoc,
    setDoc,
    arrayRemove,
    updateDoc,
  } from "firebase/firestore";

  const baseUrl = ref("https://image.tmdb.org/t/p/w1280");
  const route = useRoute();
  const router = useRouter();
  const firestore = getFirestore();

  const isLoading = ref(false);
  const movieData = ref(null);
  const starsName = ref(null);
  const isAddedToWatchlist = ref(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  onMounted(() => {
    try {
      isLoading.value = true;
      fetchMovieDetails();
      fetchMovieCredits();
      checkAddedToWatchlist();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  });

  const fetchMovieDetails = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US`,
      options
    );
    const data = await res.json();
    movieData.value = data;
  };

  const fetchMovieCredits = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}/credits?language=en-US`,
      options
    );
    const data = await res.json();
    starsName.value = data.cast
      .splice(0, 5)
      .map((star) => star.name)
      .join(", ");
  };

  const toFixed = (avg) => {
    if (avg) {
      return Number(avg).toFixed(1);
    }
    return "";
  };

  const handleAddWatchlist = async () => {
    const movieDetails = {
      id: movieData.value.id,
      title: movieData.value.title,
      poster_path: movieData.value.poster_path,
      release_date: movieData.value.release_date,
      vote_average: movieData.value.vote_average,
      overview: movieData.value.overview,
    };
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          await setDoc(
            userDocRef,
            {
              watchlist: arrayUnion(movieDetails),
            },
            { merge: true }
          );
          isAddedToWatchlist.value = true;
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/login");
      }
    });
  };

  const handleRemoveWatchList = () => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          const watchlist = userDocSnapshot.data().watchlist;
          const updatedWatchlist = watchlist.filter(
            (movie) => movie.id !== Number(route.params.id)
          );
          await setDoc(
            userDocRef,
            {
              watchlist: updatedWatchlist,
            },
            { merge: true }
          );
          isAddedToWatchlist.value = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        router.push("/login");
      }
    });
  };

  const checkAddedToWatchlist = () => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        getDoc(userDocRef).then((doc) => {
          if (doc.exists()) {
            const watchlist = doc.data().watchlist;
            const isAdded = watchlist.some(
              (movie) => movie.id === Number(route.params.id)
            );
            isAddedToWatchlist.value = isAdded;
          }
        });
      }
    });
  };
</script>
