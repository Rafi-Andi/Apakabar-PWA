<script setup>
import api from '@/router/axios'
import { BookmarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const dataNews = ref(JSON.parse(localStorage.getItem('bookmark')) || [])

const removeBookMark = (id) => {
  const index = dataNews.value.findIndex((data) => data.id === id)
  dataNews.value.splice(index, 1)
  localStorage.setItem('bookmark', JSON.stringify(dataNews.value))
  alert('Success Remove Bookmark')
}
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
    <h3 style="margin-top: 5px">Discover</h3>
    <UserIcon style="width: 30px; cursor: pointer" />
  </div>

  <div class="recommended-container" style="padding: 20px">
    <router-link
      :to="{ name: 'Detail', params: { id: item.id } }"
      v-for="(item, index) in dataNews"
      :key="index"
      style="
        text-decoration: none;
        color: var(--text-color);
        display: flex;
        padding: 20px;
        gap: 20px;
        background-color: var(--card-bg);
        margin-bottom: 20px;
        border-radius: 20px;
      "
    >
      <img
        style="border-radius: 20px"
        width="100px"
        :src="item?.image"
        alt="Image News"
        height="100px"
      />
      <div class="content">
        <h3>{{ item?.title }}</h3>
        <div
          style="
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h4 style="color: var(--accent-color)">{{ item?.category }}</h4>
          <BookmarkIcon @click="removeBookMark(item?.id)" style="width: 20px" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card-category.active {
  background-color: var(--accent-color);
}

.card-category {
  background-color: var(--card-bg);
  max-width: fit-content;
  padding: 8px 20px;
  border-radius: 50px;
}
</style>
