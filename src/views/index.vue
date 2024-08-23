<script setup lang="ts">
import { getSubscription } from '@/api/subscription'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const subscription = ref<any>([])

const loadMoreKey = ref<any>(null)


// 获取订阅列表
const getList = async () => {
    const d = {
        uid: '61adc462e0f5e723bb76b47d',
        // loadMoreKey: loadMoreKey.value,
        // subscribedAt: new Date().toISOString()
    }

    const res = await getSubscription(d)
    console.log(res)
    if (res.code === 200) {
        subscription.value = res.data.data
        loadMoreKey.value = res.data.loadMoreKey || null
    }
}

// 获取剧集列表
const getEpisodeList = async (item: any) => {
    const { pid } = item
    router.push({ path: '/episodeList', query: { pid } })
}

onMounted(() => {
    getList()
})
</script>

<template>
    <div class="flex flex-wrap">
        <div v-for="item in subscription" :key="item.id" class="relative w-[170px] h-[170px] m-3"
            @click="getEpisodeList(item)">
            <img :src="item.image.picUrl" width="170" alt="" class="absolute inset-0">
            <span class="absolute -bottom-5 left-0 text-neutral-800 text-sm">{{ item.title }}</span>
            <div class="w-full absolute bottom-0 right-0 bg-gradient-to-r from-blue-200 to-cyan-100">{{
                item.subscriptionCount }}</div>
        </div>
        <!-- <button @click="getList">加载更多</button> -->
    </div>
</template>
