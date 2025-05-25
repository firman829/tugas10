import { createRouter, createWebHistory } from 'vue-router'
import MenuPage from '../views/menu.vue'

const menuList = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/profil', name: 'Profil Saya' },
  { path: '/pesanan', name: 'Pesanan' },
  { path: '/produk', name: 'Produk' },
  { path: '/laporan', name: 'Laporan Keuangan' },
  { path: '/pengaturan', name: 'Pengaturan' },
  { path: '/notifikasi', name: 'Notifikasi' },
  { path: '/bantuan', name: 'Bantuan' },
  { path: '/tentang', name: 'Tentang Aplikasi' },
  { path: '/keluar', name: 'Keluar' }
]

const routes = [
  { path: '/', redirect: menuList[0].path },
  ...menuList.map(menu => ({
    path: menu.path,
    name: menu.name,
    component: MenuPage,
    props: { menuTitle: menu.name }
  }))
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { menuList }
export default router
