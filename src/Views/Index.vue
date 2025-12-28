<script setup>
import api from '@/router/axios'
import { BookmarkIcon, UserIcon } from '@heroicons/vue/24/solid'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const page = ref(1)
const limit = ref(10)

const dataCategory = ref([
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
  },
  {
    id: '2',
    name: 'Sport',
    slug: 'sport',
  },
  {
    id: '3',
    name: 'Economy',
    slug: 'economy',
  },
  {
    id: '4',
    name: 'Entertainment',
    slug: 'entertainment',
  },
  {
    id: '5',
    name: 'Education',
    slug: 'education',
  },
])
const categoryActive = ref('ForYou')

const dataBreakingNews = ref(null)

const fetchBreakingNews = async () => {
  const response = await api.get('/api-berita/posts?sortBy=id&orderBy=desc&page=3&limit=5')
  dataBreakingNews.value = response.data
}

const dataNews = ref(null)
const news_preferences = JSON.parse(localStorage.getItem('news-preferences')) || []
console.log(news_preferences)
const isLoading = ref(false)
const fetchNews = async () => {
  isLoading.value = true
  const response = await api.get('/api-berita/posts', {
    params: {
      page: page.value,
      limit: limit.value,
    },
    paramsSerializer: {
      indexes: null,
    },
  })
  dataNews.value = response.data
  isLoading.value = false
}

const changeCategory = (category) => {
  categoryActive.value = category
}

const filteredCategory = computed(() => {
  if (!dataNews.value) return []
  if (categoryActive.value === 'ForYou') {
    if (news_preferences.length === 0) {
      return dataNews.value
    }
    return dataNews.value.filter((post) => news_preferences.includes(post.category))
  }
  return dataNews.value.filter((post) => post.category === categoryActive.value)
})

const bookmark = ref(JSON.parse(localStorage.getItem('bookmark')) || [])

const addBookMark = (item) => {
  bookmark.value.push(item)
  console.log(item)
  localStorage.setItem('bookmark', JSON.stringify(bookmark.value))
  alert('Success Add Bookmark')
}

onMounted(() => {
  fetchNews()
  fetchBreakingNews()
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
    <h3 style="margin-top: 5px">News Portal</h3>
    <UserIcon style="width: 30px; cursor: pointer" />
  </div>
  <div
    class="container-category"
    style="padding: 10px; display: flex; overflow-x: auto; scrollbar-width: none; gap: 1rem"
  >
    <div
      class="card-category"
      @click="changeCategory('ForYou')"
      style="cursor: pointer"
      :class="{ active: categoryActive === 'ForYou' }"
    >
      <h4>ForYou</h4>
    </div>
    <div
      @click="changeCategory(item?.name)"
      style="cursor: pointer"
      class="card-category"
      v-for="(item, index) in dataCategory"
      :key="index"
      :class="{ active: categoryActive === item.name }"
    >
      <h4>{{ item?.name }}</h4>
    </div>
  </div>

  <div class="container-breaking-news" style="padding: 10px">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h2>Breaking News</h2>
      <router-link
        :to="{ name: 'Discover' }"
        style="text-decoration: none; color: var(--accent-color)"
        >View All</router-link
      >
    </div>
    <div class="container-slider">
      <router-link
        :to="{ name: 'Detail', params: { id: item.id } }"
        style="text-decoration: none; color: var(--text-color)"
        class="card-breaking-news"
        v-for="(item, index) in dataBreakingNews"
        :key="index"
      >
        <img style="border-radius: 20px" :src="item?.image" alt="" width="400px" height="250px" />
        <p class="category">{{ item?.category }}</p>
        <h3 class="title">
          {{ item?.title.slice(0, 45) }}{{ item?.title?.length > 45 ? '...' : '' }}
        </h3>
        <div class="bg-transparent"></div>
      </router-link>
    </div>
  </div>

  <div
    v-if="isLoading"
    v-for="(i, index) in 3"
    :key="index"
    style="
      margin: 20px;
      display: flex;
      padding: 20px;
      gap: 20px;
      background-color: var(--card-bg);
      margin-bottom: 20px;
      border-radius: 20px;
    "
  >
    <div
      style="
        border-radius: 20px;
        width: 100px;
        height: 100px;
        background-color: var(--accent-color);
      "
    >
      <p style="text-align: center; margin-top: 30px">Memuat Gambar</p>
    </div>
    <div class="content">
      <h3 style="margin-top: 10px">Loading...</h3>
    </div>
  </div>

  <div class="recommended-container" style="padding: 20px">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <h2>Recommended For You</h2>
      <router-link
        :to="{ name: 'Discover' }"
        style="text-decoration: none; color: var(--accent-color)"
        >See All</router-link
      >
    </div>
    <router-link
      :to="{ name: 'Detail', params: { id: item.id } }"
      v-for="(item, index) in filteredCategory"
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
        <div style="display: flex; justify-content: space-between; align-items: center">
          <h4 style="margin-bottom: 5px; color: var(--accent-color)">{{ item?.category }}</h4>
          <BookmarkIcon @click="addBookMark(item)" style="width: 20px" />
        </div>
        <h3>{{ item?.title }}</h3>
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

.container-slider {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 1.5rem;
  scroll-snap-type: x mandatory;
}

.card-breaking-news {
  scroll-snap-align: start;
  border-radius: 10px;
  position: relative;
}

.card-breaking-news .category {
  position: absolute;
  top: 0;
  padding: 8px 12px;
  margin-left: 10px;
  margin-top: 10px;
  background-color: var(--accent-color);
  border-radius: 10px;
  font-weight: 600;
}

.card-breaking-news .title {
  position: absolute;
  bottom: 0px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.374);
  color: white;
  border-radius: 0 0 20px 20px;
  margin-bottom: 2px;
}
</style>
