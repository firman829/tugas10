<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-indigo-700 mb-10">
        Resep Buatanmu Sendiri 👨‍🍳
      </h2>

      <!-- Daftar Resep -->
      <div v-if="myRecipes.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="recipe in myRecipes"
          :key="recipe.idMeal"
          class="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
        >
          <img
            :src="recipe.strMealThumb"
            :alt="recipe.strMeal"
            class="w-full h-48 object-cover"
          />
          <div class="p-5">
            <h3 class="text-xl font-semibold text-indigo-700 truncate">
              {{ recipe.strMeal }}
            </h3>
            <p class="text-sm text-gray-500 mb-4">{{ recipe.strCategory }}</p>

            <div class="flex gap-2 flex-wrap">
              <router-link
                :to="`/recipe/${recipe.idMeal}`"
                class="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
              >
                Lihat Detail
              </router-link>
              <router-link
                :to="`/edit/${recipe.idMeal}`"
                class="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition"
              >
                Edit
              </router-link>
              <button
                @click="deleteRecipe(recipe.id)"
                class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tidak Ada Resep -->
      <div v-else class="text-center text-gray-500 mt-20">
        <img
          src="https://img.icons8.com/fluency/96/no-data.png"
          alt="No Data"
          class="mx-auto mb-4"
        />
        <p class="text-lg">Belum ada resep yang kamu tambahkan. Yuk, buat sekarang!</p>
        <router-link
          to="/add"
          class="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Tambah Resep Baru
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRecipeStore } from '../store/recipeStore'
import { storeToRefs } from 'pinia'

const store = useRecipeStore()
const { myRecipes } = storeToRefs(store)

onMounted(() => {
  store.fetchMyRecipes()
})

const deleteRecipe = async (id) => {
  const konfirmasi = confirm('Yakin ingin menghapus resep ini?')
  if (konfirmasi) {
    await store.deleteMyRecipe(id)
  }
}
</script>
