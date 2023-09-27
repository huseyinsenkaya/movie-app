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
      <button class="button">Register</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { getFirestore, doc, setDoc } from "firebase/firestore";

  const router = useRouter();
  const firestore = getFirestore();

  const email = ref("");
  const password = ref("");

  const registerUser = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const user = userCredential.user;
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        watchlist: [],
      });

      router.push("/movie-app");
    } catch (error) {
      alert(error.message);
    }
  };
</script>
