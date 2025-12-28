<script setup>
import {
  BookmarkIcon,
  Cog6ToothIcon,
  HomeIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'
const activeTheme = ref(localStorage.getItem('theme') || 'system')

const isOffline = ref(!navigator.onLine)

const toggleStatus = () => {
  isOffline.value = !navigator.onLine
  console.log('test')
}

onMounted(() => {
  window.addEventListener('online', toggleStatus)
  window.addEventListener('offline', toggleStatus)
  if (activeTheme.value === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  } else {
    document.documentElement.setAttribute('data-theme', activeTheme.value)
  }
})
</script>

<template>
  <div v-if="isOffline" class="game-container">
    <iframe src="/offline.html" frameborder="0"></iframe>
  </div>
  <main v-else>
    <div style="flex: 1">
      <router-view></router-view>
    </div>
    <nav class="nav-bottom">
      <router-link
        style="text-decoration: none"
        :to="{ name: 'Index' }"
        active-class="router-active"
        class="navigasi"
      >
        <HomeIcon class="icon" style="width: 20px" />
        <p>Home</p>
      </router-link>
      <router-link
        style="text-decoration: none"
        :to="{ name: 'Discover' }"
        active-class="router-active"
        class="navigasi"
      >
        <MagnifyingGlassIcon class="icon" style="width: 20px" />
        <p>Discover</p>
      </router-link>
      <router-link
        style="text-decoration: none"
        :to="{ name: 'Bookmark' }"
        active-class="router-active"
        class="navigasi"
      >
        <BookmarkIcon class="icon" style="width: 20px" />
        <p>Bookmark</p>
      </router-link>
      <router-link
        style="text-decoration: none"
        :to="{ name: 'Setting' }"
        active-class="router-active"
        class="navigasi"
      >
        <Cog6ToothIcon class="icon" style="width: 20px" />
        <p>Setting</p>
      </router-link>
    </nav>
  </main>
</template>

<style scoped>
.game-container {
  width: 100%;
  max-width: 480px; /* Ikuti aturan 480px */
  height: 100vh;
  margin: auto;
  overflow: hidden;
}
.game-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  flex: 1; /* Mengambil sisa ruang */
}
main {
  max-width: 480px;
  margin: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: 0.5px;
  position: relative;
  scrollbar-width: none;
}
.nav-bottom {
  flex-shrink: 0;
  z-index: 9999;
  background-color: var(--bg-color);
  border-top: 0.5px solid rgb(62, 61, 61);
  height: 60px;
  width: 100%;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
}

.navigasi {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--text-color);
  align-items: center;
}
.navigasi.router-active {
  color: var(--accent-color);
}
</style>
