<template>
  <div class="min-h-screen bg-white">
    <div v-if="recipe" class="max-w-4xl mx-auto py-10 px-4">
      <!-- Gambar -->
      <div class="mb-8">
        <img
          :src="recipe.strMealThumb"
          :alt="recipe.strMeal"
          class="w-full h-64 sm:h-96 object-cover rounded-xl shadow-md"
        />
      </div>

      <!-- Info Utama -->
      <div class="mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">{{ recipe.strMeal }}</h1>
        <p class="text-gray-500 text-lg">Kategori: {{ recipe.strCategory }}</p>
      </div>

      <!-- Tombol Favorit -->
      <div class="mb-8">
        <button
          @click="handleFavorite"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Tambahkan ke Favorit ❤️
        </button>
      </div>

      <!-- Instruksi -->
      <div>
        <h2 class="text-xl font-semibold text-indigo-600 mb-3">Instruksi Memasak</h2>
        <p class="whitespace-pre-line text-gray-700 leading-relaxed">
          {{ recipe.strInstructions }}
        </p>
      </div>
    </div>

    <!-- Loading/Error -->
    <div v-else class="text-center py-20 text-gray-500">
      <p>Memuat resep...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../store/recipeStore'

const store = useRecipeStore()
const route = useRoute()
const recipe = ref(null)

onMounted(async () => {
  const id = route.params.id
  recipe.value = await store.getRecipeById(id)
})

const handleFavorite = async () => {
  if (recipe.value) {
    await store.addFavorite(recipe.value)
    alert('Resep ditambahkan ke favorit!')
  }
}
</script>
