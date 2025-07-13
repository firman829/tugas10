<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between text-white">
        <!-- Logo & Judul bisa diklik untuk kembali ke beranda -->
        <router-link
          to="/"
          class="flex items-center space-x-3 hover:opacity-90 transition duration-200"
        >
          <img
            src="https://img.icons8.com/color/48/chef-hat.png"
            alt="logo"
            class="w-10 h-10"
          />
          <h1 class="text-2xl font-bold tracking-wide">Recipe Finder</h1>
        </router-link>

        <!-- Navigation Menu -->
        <nav class="space-x-4 text-sm sm:text-base font-medium">
          <router-link
            to="/"
            class="hover:text-yellow-300 transition"
            exact-active-class="text-yellow-300 underline"
          >Beranda</router-link>

          <router-link
            to="/favorites"
            class="hover:text-yellow-300 transition"
            exact-active-class="text-yellow-300 underline"
          >Favorit</router-link>

          <router-link
            to="/add"
            class="hover:text-yellow-300 transition"
            exact-active-class="text-yellow-300 underline"
          >Tambah Resep</router-link>

          <router-link
            to="/my-recipes"
            class="hover:text-yellow-300 transition"
            exact-active-class="text-yellow-300 underline"
          >Resep Saya</router-link>
        </nav>
      </div>
    </header>

    <!-- Konten Utama -->
    <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-10 relative z-10">
      <router-view />
    </main>

    <!-- Gambar Latar Belakang -->
    <div
      class="absolute inset-0 z-0 opacity-5 bg-cover bg-center pointer-events-none"
      style="background-image: url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80');"
    ></div>

    <!-- Footer -->
    <footer class="bg-white border-t z-20 relative text-center text-sm text-gray-600 py-6 shadow-inner">
      &copy; {{ new Date().getFullYear() }} Recipe Finder — Dibuat dengan 🍜 dan semangat
    </footer>
  </div>
</template>
