<script setup>
import { onMounted, ref } from 'vue'

const activeTheme = ref(localStorage.getItem('theme') || 'system')

const changeTheme = (theme) => {
  localStorage.setItem('theme', theme)
  activeTheme.value = theme
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

onMounted(() => {
  if (activeTheme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  } else {
    document.documentElement.setAttribute('data-theme', activeTheme.value)
  }
})
</script>

<template>
  <div
    style="
      padding: 15px;
      border-bottom: 0.5px solid rgb(62, 61, 61);
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      background-color: var(--bg-color);
      z-index: 9999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    "
  >
    <h3 style="margin-top: 5px">Appearance & Content</h3>
    <UserIcon style="width: 30px; cursor: pointer" />
  </div>

  <h3 style="margin-top: 20px">Display</h3>
  <div class="container-theme">
    <div
      style="cursor: pointer"
      class="option"
      @click="changeTheme('light')"
      :class="{ active: activeTheme === 'light' }"
    >
      Light
    </div>
    <div
      style="cursor: pointer"
      class="option"
      @click="changeTheme('dark')"
      :class="{ active: activeTheme === 'dark' }"
    >
      Dark
    </div>
    <div
      style="cursor: pointer"
      class="option"
      @click="changeTheme('system')"
      :class="{ active: activeTheme === 'system' }"
    >
      System
    </div>
  </div>
  <p>Chosee a virtual style for the app. systems follows your device settings</p>
</template>

<style scoped>
.container-theme {
  display: flex;
  max-width: 480px;
  background-color: var(--card-bg);
  padding: 8px;
  gap: 10px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.container-theme .option {
  background-color: var();
  padding: 10px;
  width: 160px;
  text-align: center;
  font-weight: 600;
  border-radius: 10px;
}

.option.active {
  background-color: var(--active-card-bg);
}
</style>
