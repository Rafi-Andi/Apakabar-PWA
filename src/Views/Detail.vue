<script setup lang="ts">
import router from '@/router'
import api from '@/router/axios'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const goBack = () => {
  router.back()
}
const route = useRoute()
const id = route.params.id

const dataDetail = ref(null)
const isLoading = ref(false)
const fetchDetail = async () => {
  try {
    isLoading.value = true
    const response = await api.get(`/api-berita/posts/${id}`)
    dataDetail.value = response.data
    console.log(dataDetail.value)
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => fetchDetail())
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
    <ArrowLeftIcon style="width: 30px; cursor: pointer" @click="goBack()" />
  </div>
  <p v-if="isLoading">Loading..</p>
  <div class="content">
    <h2 style="margin-top: 10px">{{ dataDetail?.title }}</h2>

    <div style="width: 100%; max-width: 480px; display: flex; justify-content: center">
      <img style="border-radius: 30px; width: 90%; margin: auto" :src="dataDetail?.image" alt="" />
    </div>
    <p
      style="
        font-style: italic;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;
        color: var(--text-color-secondary);
      "
    >
      {{ dataDetail?.image }}
    </p>
    <p>{{ dataDetail?.content }}</p>
  </div>
</template>
