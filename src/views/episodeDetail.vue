<script setup lang="ts">
import { episodeDetail } from '@/api/subscription'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlayBar from '@/components/PlayBar.vue'
const route = useRoute()
const eDetail = ref<any>([])
const router = useRouter()

// 获取剧集列表
const getDetail = async (eid: string) => {
    const res = await episodeDetail({ eid })
    console.log(res)
    if (res.code === 200) {
        eDetail.value = res.data.data
    } else {
        console.log(res.msg)
    }
}
const playEpisode = (eDetail: any) => {
    console.log(eDetail.enclosure.url)
}

onMounted(() => {
    getDetail(route.query.eid as string)
})
</script>

<template>
    <div class="flex items-center pl-5 pr-5 pt-2 pb-0 sticky top-0 bg-white">
        <button class="pl-5 pr-5 rounded-md" @click="router.back()">
            <font-awesome-icon icon="fa-arrow-left" />
        </button>
        <h3 @click="playEpisode(eDetail)" class="text-neutral-800 text-xm font-bold ml-2">
            {{ eDetail.title }}
        </h3>
    </div>
    <div class="flex flex-col p-5">
        <div class="text-neutral-800 text-sm" v-html="(eDetail.shownotes)"></div>
    </div>
    <PlayBar :audioUrl="eDetail.enclosure?.url" :episodeTitle="eDetail.title" />
</template>

<style>
p {
    margin-bottom: 10px;
}
</style>
