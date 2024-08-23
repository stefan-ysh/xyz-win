<script setup lang="ts">
import { episodeList } from '@/api/subscription'

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const programList = ref([])

const router = useRouter()



// 获取剧集列表
const getEpisodeList = async (pid: string) => {
    const res = await episodeList({ pid })
    console.log(res)
    if (res.code === 200) {
        programList.value = res.data.data
    } else {
        console.log(res.msg)
    }
}

onMounted(() => {
    getEpisodeList(route.query.pid as string)
})
</script>

<template>
    <div class="flex flex-col">
        <button class="bg-blue-500 text-white p-2 rounded-md" @click="router.back()">
            < </button>
                <div v-for="item in programList" :key="item.id" @click="router.push(`/episodeDetail?eid=${item.eid}`)"
                    class="relative p-5 m-2 border border-gray-300 flex flex-col items-stretch cursor-pointer hover:bg-gray-100">
                    <div class="flex items-center mb-1">
                        <img :src="item.image ? item.image.picUrl : item.podcast.image.picUrl" width="30" class="mr-2">
                        <span class=" text-neutral-800 text-sm">{{ item.title }}</span>
                    </div>
                    <div class="flex items-center mt-1">
                        <span class="text-neutral-800 text-sm mr-5"> 评论数：{{ item.commentCount }}</span>
                        <span class="text-neutral-800 text-sm mr-5"> 播放数：{{ item.playCount }}</span>
                        <span class="text-neutral-800 text-sm mr-5"> 时长：{{ new Date(item.duration *
                            1000).toISOString().slice(11, 19)
                            }}</span>
                    </div>
                </div>
    </div>
</template>