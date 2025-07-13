<template>
  <div class="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-10 px-4">
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 class="text-3xl font-bold text-indigo-700 mb-6 text-center">Tambah Resep Baru 🍽️</h2>

      <form @submit.prevent="submitRecipe" class="space-y-6">
        <!-- Nama Resep -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Nama Resep</label>
          <input
            v-model="form.strMeal"
            type="text"
            placeholder="Contoh: Nasi Goreng"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Kategori -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Kategori</label>
          <input
            v-model="form.strCategory"
            type="text"
            placeholder="Contoh: Makanan Indonesia"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        <!-- Instruksi -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">Instruksi</label>
          <textarea
            v-model="form.strInstructions"
            rows="5"
            placeholder="Tulis langkah-langkah pembuatan di sini..."
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
          ></textarea>
        </div>

        <!-- Gambar -->
        <div>
          <label class="block font-medium text-gray-700 mb-1">URL Gambar</label>
          <input
            v-model="form.strMealThumb"
            type="text"
            placeholder="Contoh: https://..."
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <div v-if="form.strMealThumb" class="mt-4">
            <p class="text-sm text-gray-500 mb-1">Preview:</p>
            <img :src="form.strMealThumb" alt="Preview" class="w-full h-64 object-cover rounded-lg shadow" />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center pt-4">
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
          >
            Simpan Resep
          </button>
        </div>
      </form>

      <!-- Notifikasi -->
      <div v-if="message" class="mt-6 text-center">
        <p :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRecipeStore } from '../store/recipeStore'

const store = useRecipeStore()

// Form data
const form = reactive({
  strMeal: '',
  strCategory: '',
  strInstructions: '',
  strMealThumb: ''
})

const message = ref('')
const messageType = ref('') // 'success' or 'error'

const resetForm = () => {
  form.strMeal = ''
  form.strCategory = ''
  form.strInstructions = ''
  form.strMealThumb = ''
}

// Validasi & Submit
const submitRecipe = async () => {
  if (!form.strMeal || !form.strCategory || !form.strInstructions || !form.strMealThumb) {
    message.value = 'Mohon lengkapi semua data resep.'
    messageType.value = 'error'
    return
  }

  try {
    await store.addMyRecipe({ ...form })
    message.value = 'Resep berhasil ditambahkan!'
    messageType.value = 'success'
    resetForm()
  } catch (err) {
    message.value = 'Terjadi kesalahan saat menambahkan resep.'
    messageType.value = 'error'
  }
}
</script>
