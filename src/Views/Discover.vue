<script setup>
import api from '@/router/axios'
import { BookmarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref } from 'vue'

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

const categoryActive = ref('Technology')

const search = ref('')
const limit = ref(3)
const page = ref(1)
const dataNews = ref([])
const isLoadingNews = ref(false)
const isNoMoreData = ref(false)
const observerTarget = ref(null)

const filteredNews = computed(() => {
  if (!search.value) return dataNews.value

  const query = search.value.toLowerCase()
  return dataNews.value.filter((data) => {
    return data.title.toLowerCase().includes(query)
  })
})

const fetchNews = async (isLoadMore = false) => {
  try {
    isLoadingNews.value = true
    const response = await api.get('/api-berita/posts', {
      params: {
        limit: limit.value,
        page: page.value,
        category: categoryActive.value,
      },
    })
    const newsItem = response.data
    if (isLoadMore) {
      dataNews.value = [...dataNews.value, ...newsItem]
    } else {
      dataNews.value = newsItem
    }

    if (newsItem.length < limit.value) {
      isNoMoreData.value = true
    } else {
      isNoMoreData.value = false
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoadingNews.value = false
  }
}

const loadMore = () => {
  if (search.value) return
  if (!isNoMoreData.value && !isLoadingNews.value) {
    page.value++
    fetchNews(true)
  }
}

const seachTimeOut = ref(null)
const onInputSearch = () => {
  clearTimeout(seachTimeOut.value)

  seachTimeOut.value = setTimeout(() => {
    page.value = 1
    isNoMoreData.value = false
    fetchNews()
  }, 1000)
}

const changeCategory = (category) => {
  categoryActive.value = category
  page.value = 1
  isNoMoreData.value = false
  fetchNews()
}

const bookmark = ref(JSON.parse(localStorage.getItem('bookmark')) || [])

const addBookMark = (item) => {
  bookmark.value.push(item)
  console.log(item)
  localStorage.setItem('bookmark', JSON.stringify(bookmark.value))
  alert('Success Add Bookmark')
}

onMounted(() => {
  fetchNews()

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    },
    { threshold: 1 },
  )

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
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
    <h3 style="margin-top: 5px">Discover</h3>
    <UserIcon style="width: 30px; cursor: pointer" />
  </div>
  <div
    class="filter"
    style="
      background-color: var(--card-bg);
      border-radius: 10px;
      margin: 10px;
      display: flex;
      align-items: center;
      padding: 10px;
    "
  >
    <MagnifyingGlassIcon style="width: 30px" />
    <input
      v-model="search"
      @input="onInputSearch()"
      type="text"
      style="
        padding: 5px;
        color: var(--text-color);
        background-color: transparent;
        outline: none;
        border: none;
        width: 100%;
      "
      placeholder="Search"
    />
  </div>
  <div
    class="container-category"
    style="padding: 10px; display: flex; overflow-x: auto; scrollbar-width: none; gap: 1rem"
  >
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

  <div
    v-if="isLoadingNews && dataNews.length === 0"
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
    <router-link
      :to="{ name: 'Detail', params: { id: item.id } }"
      v-for="(item, index) in filteredNews"
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
          <BookmarkIcon @click="addBookMark(item)" style="width: 20px" />
        </div>
      </div>
    </router-link>
    <div
      ref="observerTarget"
      style="height: 50px; display: flex; justify-content: center; align-items: center"
    >
      <p v-if="isLoadingNews">Memuat berita lainnya...</p>
      <p v-if="isNoMoreData && dataNews?.length > 0">Semua berita telah ditampilkan.</p>
    </div>
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
