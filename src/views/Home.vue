<template>
  <div class="min-h-screen bg-gradient-to-tr from-indigo-50 to-white">
    <!-- Hero Image -->
    <section class="relative">
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80"
        alt="Food Hero"
        class="w-full h-72 object-cover brightness-75"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white">
          <h1 class="text-4xl font-bold mb-2">Selamat Datang di Recipe Finder!</h1>
          <p class="text-lg">Temukan dan kelola resep favorit dari kreasi anda sendiri 🍽️</p>
        </div>
      </div>
    </section>

    <!-- Resep Baru -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Resep Terbaru dari Kamu 📝
        </h2>

        <div
          v-if="latestRecipes.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="recipe in latestRecipes"
            :key="recipe.idMeal"
            class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="h-48 w-full object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-indigo-700 truncate">{{ recipe.strMeal }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ recipe.strCategory }}</p>
              <router-link
                :to="`/recipe/${recipe.idMeal}`"
                class="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
              >
                Lihat Detail
              </router-link>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 mt-10">
          <p>Belum ada resep yang kamu tambahkan.</p>
        </div>
      </div>
    </section>

    <!-- Favorit -->
    <section class="py-16 px-4 bg-indigo-100">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6 text-center">Resep Favoritmu ❤️</h2>

        <div
          v-if="favorites.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div
            v-for="fav in favorites"
            :key="fav.idMeal"
            class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img :src="fav.strMealThumb" :alt="fav.strMeal" class="h-48 w-full object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-indigo-700 truncate">{{ fav.strMeal }}</h3>
              <p class="text-sm text-gray-500 mb-3">{{ fav.strCategory }}</p>

              <div class="flex flex-wrap gap-2">
                <router-link
                  :to="`/recipe/${fav.idMeal}`"
                  class="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
                >
                  Lihat Detail
                </router-link>

                <button
                  @click="removeFavorite(fav.id ?? fav.idMeal)"
                  class="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">
          <p>Kamu belum menambahkan resep ke favorit.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onActivated, computed } from 'vue'
import { useRecipeStore } from '../store/recipeStore'
import { storeToRefs } from 'pinia'

const store = useRecipeStore()
const { favorites, myRecipes } = storeToRefs(store)

// Ambil 3 resep terbaru dari belakang
const latestRecipes = computed(() => {
  return [...myRecipes.value].slice(-3).reverse()
})

const removeFavorite = async (id) => {
  await store.removeFavorite(id)
}

// Ambil data saat halaman dibuka & diaktifkan kembali
const fetchAll = () => {
  store.fetchFavorites()
  store.fetchMyRecipes()
}

onMounted(fetchAll)
onActivated(fetchAll)
</script>
