<template>
  <header>
    <nav class="py-8 flex justify-between gap-10 text-white">
      <div class="flex gap-10 items-center">
        <div class="hover:-rotate-6 transition-all">
          <router-link class="text-2xl cursor-pointer" to="/"
            >MovieApp</router-link
          >
        </div>
        <ul class="flex gap-10">
          <li class="hover:text-neutral-200 cursor-pointer text-xl">
            <router-link to="/" class="flex gap-2 items-center">
              <HomeIcon class="w-5 h-5" />
              <span class="hidden md:block">Home</span>
            </router-link>
          </li>
          <li class="hover:text-neutral-200 cursor-pointer text-xl">
            <router-link to="/search" class="flex gap-2 items-center">
              <MagnifyingGlassIcon class="w-5 h-5" />
              <span class="hidden md:block">Search</span>
            </router-link>
          </li>
          <li class="hover:text-neutral-200 cursor-pointer text-xl">
            <router-link to="/watchlist" class="flex gap-2 items-center">
              <StarIcon class="w-5 h-5" />
              <span class="hidden md:block">Watchlist</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <div v-if="isLoggedIn === null">...</div>
        <button
          @click="handleSignOut"
          class="button flex"
          v-else-if="isLoggedIn"
        >
          <UserIcon class="w-5 h-5" />
          <span class="hidden md:block">Log out</span>
        </button>
        <button v-else class="button flex" @click="handleLogin">
          <UserIcon class="w-5 h-5" />
          <span class="hidden md:block">Log In</span>
        </button>
      </div>
    </nav>
  </header>
</template>
<script setup>
  import {
    HomeIcon,
    MagnifyingGlassIcon,
    StarIcon,
    UserIcon,
  } from "@heroicons/vue/24/solid";
  import { useRouter } from "vue-router";
  import { onMounted, ref } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

  const isLoggedIn = ref(null);
  const router = useRouter();

  let auth;
  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });
  });

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        isLoggedIn.value = false;
        router.push("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
</script>
