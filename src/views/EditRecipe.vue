<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative">
      <h2 class="text-3xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
        <img src="https://img.icons8.com/fluency/48/edit.png" class="w-8 h-8" />
        Edit Resep
      </h2>

      <form @submit.prevent="submitEdit">
        <div class="space-y-5">
          <div>
            <label class="block text-gray-600 font-semibold mb-2">Nama Resep</label>
            <input
              v-model="recipe.strMeal"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Contoh: Mie Goreng Spesial"
            />
          </div>

          <div>
            <label class="block text-gray-600 font-semibold mb-2">Kategori</label>
            <input
              v-model="recipe.strCategory"
              type="text"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Contoh: Makanan Indonesia"
            />
          </div>

          <div>
            <label class="block text-gray-600 font-semibold mb-2">Link Gambar</label>
            <input
              v-model="recipe.strMealThumb"
              type="url"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label class="block text-gray-600 font-semibold mb-2">Instruksi Memasak</label>
            <textarea
              v-model="recipe.strInstructions"
              rows="5"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Langkah demi langkah memasak..."
            ></textarea>
          </div>

          <div class="flex justify-end mt-6 gap-4">
            <router-link
              to="/my-recipes"
              class="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </router-link>

            <button
              type="submit"
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-solid"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRecipeStore } from '../store/recipeStore'

const store = useRecipeStore()
const route = useRoute()
const router = useRouter()

const recipe = ref({
  id: null,
  strMeal: '',
  strCategory: '',
  strInstructions: '',
  strMealThumb: '',
  idMeal: ''
})

const isLoading = ref(false)

const loadRecipe = async () => {
  isLoading.value = true
  const id = route.params.id
  const data = await store.getRecipeById(id)

  if (data) {
    recipe.value = {
      id: data.id,
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb,
      idMeal: data.idMeal || `local_${data.id}`
    }
  } else {
    alert('Resep tidak ditemukan.')
    router.push('/my-recipes')
  }

  isLoading.value = false
}

const submitEdit = async () => {
  isLoading.value = true

  // Gunakan ID numerik yang digunakan oleh JSON Server
  const updatedRecipe = {
    ...recipe.value,
    id: Number(recipe.value.id),
    idMeal: recipe.value.idMeal || `local_${recipe.value.id}`
  }

  await store.updateMyRecipe(updatedRecipe.id, updatedRecipe)

  isLoading.value = false
  router.push('/my-recipes')
}

onMounted(() => {
  loadRecipe()
})
</script>
