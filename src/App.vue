<template>
  <div class="app">
    <!-- Tombol Hamburger -->
    <button class="hamburger" @click="toggleDrawer">☰</button>

    <!-- Header -->
    <header class="main-header">
      <h1>Menulist</h1>
    </header>

    <!-- Drawer Menu -->
    <aside class="drawer" :class="{ open: drawerOpen }">
      <ul>
        <li v-for="menu in menuList" :key="menu.path">
          <router-link :to="menu.path" @click.native="closeDrawer" class="menu-link" active-class="active">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Konten Utama -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { menuList } from './router'

export default {
  data() {
    return {
      drawerOpen: false,
      menuList
    }
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
    },
    closeDrawer() {
      this.drawerOpen = false
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
}

/* Header Biru Tengah Atas */
.main-header {
  background-color: greenyellow;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 999;
}

/* Tombol Hamburger */
.hamburger {
  position: fixed;
  top: 1rem;
  left: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  color: red;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  background-color: #222;
  color: white;
  padding-top: 60px;
  overflow-x: hidden;
  transition: width 0.3s ease;
  z-index: 1000;
}

.drawer.open {
  width: 200px;
}

.drawer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.drawer li {
  border-bottom: 1px solid #444;
}

.menu-link {
  color: white;
  text-decoration: none;
  display: block;
  padding: 1rem;
  transition: background-color 0.2s ease;
}

.menu-link:hover {
  background-color: #444;
}

.active {
  font-weight: bold;
  background-color: #555;
}

/* Konten Utama */
.content {
  padding: 2rem;
  margin-top: 3.5rem; /* agar tidak tertutup header */
}
</style>
