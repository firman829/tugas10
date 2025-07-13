// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import komponen halaman (views)
import Home from '../views/Home.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import Favorites from '../views/Favorites.vue'
import AddRecipe from '../views/AddRecipe.vue'
import MyRecipes from '../views/MyRecipes.vue'
import EditRecipe from '../views/EditRecipe.vue' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/add',
    name: 'AddRecipe',
    component: AddRecipe
  },
  {
    path: '/my-recipes',
    name: 'MyRecipes',
    component: MyRecipes
  },
  {
    path: '/edit/:id', 
    name: 'EditRecipe',
    component: EditRecipe
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
