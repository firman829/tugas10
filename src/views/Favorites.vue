<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-indigo-50">
    <!-- Hero Section -->
    <section class="relative">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
        alt="Food Hero"
        class="w-full h-72 object-cover brightness-75"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl font-bold mb-2 drop-shadow-lg">Favoritmu 🍲</h1>
          <p class="text-lg drop-shadow-md">Kumpulan resep yang kamu sukai dan ingin coba lagi!</p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <h2 class="text-2xl font-bold text-indigo-700 mb-8 text-center">Daftar Resep Favorit ❤️</h2>

      <div v-if="favorites.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="fav in favorites"
          :key="fav.idMeal"
          class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
        >
          <img
            :src="fav.strMealThumb"
            :alt="fav.strMeal"
            class="w-full h-48 object-cover"
          />
          <div class="p-5">
            <h3 class="text-lg font-bold text-indigo-700 truncate">{{ fav.strMeal }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ fav.strCategory }}</p>

            <div class="flex flex-wrap gap-2">
              <router-link
                :to="`/recipe/${fav.idMeal}`"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Lihat Detail
              </router-link>
              <button
                @click="removeFavorite(fav.id ?? fav.idMeal)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-16 text-gray-500">
        <img
          src="https://img.icons8.com/ios-filled/100/heart-with-arrow.png"
          alt="Empty heart"
          class="mx-auto opacity-30 mb-4"
        />
        <p class="text-lg">Belum ada resep favorit. Yuk, tambahkan beberapa!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRecipeStore } from '../store/recipeStore'
import { storeToRefs } from 'pinia'

const store = useRecipeStore()
const { favorites } = storeToRefs(store)

const removeFavorite = async (id) => {
  await store.removeFavorite(id)
}

// Fetch favorites saat pertama kali halaman dimuat
onMounted(() => {
  store.fetchFavorites()
})
</script>
