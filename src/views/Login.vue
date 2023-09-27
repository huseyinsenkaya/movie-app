<template>
  <div class="flex justify-center mt-12">
    <form
      class="text-white flex flex-col max-w-md w-96"
      @submit.prevent="registerUser"
    >
      <label class="text-sm flex flex-col w-full gap-2 mb-6">
        Email
        <input
          class="w-full h-10 rounded text-black p-2"
          type="email"
          v-model="email"
          reqired
        />
      </label>
      <label class="text-sm flex flex-col w-full gap-2 mb-6">
        Password
        <input
          class="w-full h-10 rounded text-black p-2"
          type="password"
          v-model="password"
          required
        />
      </label>

      <router-link to="/movie-app/register" class="mb-2">
        <span class="text-xs text-blue-100 mb-2">Create an account</span>
      </router-link>
      <button class="button">Log in</button>
      <p v-if="errMsg" class="text-red-400 text-center mt-2">{{ errMsg }}</p>
    </form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const email = ref("");
  const password = ref("");
  const errMsg = ref();

  const registerUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        router.push("/movie-app");
      })
      .catch((error) => {
        console.log(error.code);
        errMsg.value = "Something went wrong!";
      });
  };
</script>
