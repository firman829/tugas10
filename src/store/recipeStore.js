import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = 'http://localhost:3000' // JSON Server base URL

export const useRecipeStore = defineStore('recipeStore', {
  state: () => ({
    apiRecipes: [],
    localRecipes: [],
    favorites: [],
    myRecipes: [],
    isLoading: false,
    error: null
  }),

  getters: {
    // Resep terbaru muncul di atas
    latestMyRecipes: (state) => [...state.myRecipes].reverse()
  },

  actions: {
    /* ------------------------- MY RECIPES ---------------------------- */
    async fetchMyRecipes() {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axios.get(`${API_BASE}/myRecipes`)
        this.myRecipes = data
      } catch (err) {
        this.error = 'Gagal memuat resep pengguna.'
      } finally {
        this.isLoading = false
      }
    },

    async addMyRecipe(recipe) {
      // Cek duplikat berdasarkan nama resep
      const duplicate = this.myRecipes.some(
        r => r.strMeal.trim().toLowerCase() === recipe.strMeal.trim().toLowerCase()
      )
      if (duplicate) {
        this.error = 'Resep dengan nama tersebut sudah ada.'
        return
      }

      const timestamp = Date.now()
      const newRecipe = {
        ...recipe,
        idMeal: `local_${timestamp}`,
        id: timestamp
      }

      try {
        this.myRecipes.push(newRecipe) // Optimistic update
        await axios.post(`${API_BASE}/myRecipes`, newRecipe)
      } catch (err) {
        this.myRecipes = this.myRecipes.filter(r => r.id !== newRecipe.id)
        this.error = 'Gagal menambahkan resep.'
      }
    },

    async updateMyRecipe(id, updated) {
      if (!id || typeof id !== 'number') {
        this.error = 'ID tidak valid untuk update.'
        return
      }

      try {
        await axios.put(`${API_BASE}/myRecipes/${id}`, updated)
        await this.fetchMyRecipes()
      } catch {
        this.error = 'Gagal mengupdate resep.'
      }
    },

    async deleteMyRecipe(id) {
      try {
        await axios.delete(`${API_BASE}/myRecipes/${id}`)
        this.myRecipes = this.myRecipes.filter(r => r.id !== id)
      } catch {
        this.error = 'Gagal menghapus resep.'
      }
    },

    /* -------------------------- FAVORITES ---------------------------- */
    async fetchFavorites() {
      try {
        const { data } = await axios.get(`${API_BASE}/favorites`)
        this.favorites = data
      } catch {
        this.error = 'Gagal memuat favorit.'
      }
    },

    async addFavorite(recipe) {
      if (this.favorites.some(r => r.idMeal === recipe.idMeal)) return

      const fav = { ...recipe, id: recipe.idMeal } // id digunakan JSON Server
      try {
        this.favorites.push(fav)
        await axios.post(`${API_BASE}/favorites`, fav)
      } catch {
        this.favorites = this.favorites.filter(r => r.idMeal !== fav.idMeal)
        this.error = 'Gagal menambahkan ke favorit.'
      }
    },

    async removeFavorite(id) {
      try {
        await axios.delete(`${API_BASE}/favorites/${id}`)
        this.favorites = this.favorites.filter(r => r.id !== id)
      } catch {
        this.error = 'Gagal menghapus dari favorit.'
      }
    },

    /* -------------------------- DETAIL ------------------------------- */
    async getRecipeById(id) {
      try {
        // Resep buatan lokal
        if (id.startsWith('local_')) {
          const all = await axios.get(`${API_BASE}/myRecipes`)
          const recipe = all.data.find(r => r.idMeal === id)
          return recipe || null
        }

        // Resep dari API publik
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        return data.meals?.[0] || null
      } catch {
        this.error = 'Gagal mengambil detail resep.'
        return null
      }
    },

    /* --------------------------- SEARCH ------------------------------ */
    async searchLocalRecipes(query) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axios.get(`${API_BASE}/myRecipes`, {
          params: { q: query }
        })
        this.localRecipes = data
      } catch {
        this.error = 'Gagal mencari resep lokal.'
        this.localRecipes = []
      } finally {
        this.isLoading = false
      }
    },

    async searchRecipes(query) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        )
        this.apiRecipes = data.meals || []
      } catch {
        this.error = 'Gagal mengambil data dari API.'
        this.apiRecipes = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
