<template>
    <div class="custom-audio-player fixed bottom-0 left-0 right-0 bg-[#65bfd6] p-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <button @click="skipBackward" class="text-white mr-2">
                    <font-awesome-icon icon="fa-backward" />
                </button>
                <button @click="togglePlay" class="text-white mr-2">
                    <font-awesome-icon size="2xl" :icon="isPlaying ? 'fa-pause' : 'fa-play'" />
                </button>
                <button @click="skipForward" class="text-white mr-4">
                    <font-awesome-icon icon="fa-forward" />
                </button>
                <div class="text-white">
                    <div class="font-semibold">{{ episodeTitle }}</div>
                    <div class="text-sm text-gray-300">{{ currentTime }} / {{ duration }}</div>
                </div>
            </div>
            <input type="range" min="0" :max="audioDuration" v-model="currentPosition" @input="seek"
                class="w-1/3 accent-white">
            <div class="flex items-center">
                <button @click="adjustVolume(-0.1)" class="text-white mr-2">
                    <font-awesome-icon icon="fa-volume-down" />
                </button>
                <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="setVolume"
                    class="w-24 accent-white">
                <button @click="adjustVolume(0.1)" class="text-white ml-2">
                    <font-awesome-icon icon="fa-volume-up" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    episodeTitle: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    }
})

const audioElement = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref('00:00')
const duration = ref('00:00')
const currentPosition = ref(0)
const audioDuration = ref(0)
const volume = ref(1)

const togglePlay = () => {
    if (audioElement.value) {
        if (isPlaying.value) {
            audioElement.value.pause()
        } else {
            audioElement.value.play()
        }
        isPlaying.value = !isPlaying.value
    }
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const updateTime = () => {
    if (audioElement.value) {
        currentTime.value = formatTime(audioElement.value.currentTime)
        currentPosition.value = audioElement.value.currentTime
    }
}

const seek = () => {
    if (audioElement.value) {
        audioElement.value.currentTime = currentPosition.value
    }
}

const setVolume = () => {
    if (audioElement.value) {
        audioElement.value.volume = volume.value
    }
}

const adjustVolume = (delta: number) => {
    volume.value = Math.max(0, Math.min(1, volume.value + delta))
    setVolume()
}

const skipForward = () => {
    if (audioElement.value) {
        audioElement.value.currentTime = Math.min(audioElement.value.duration, audioElement.value.currentTime + 10)
    }
}

const skipBackward = () => {
    if (audioElement.value) {
        audioElement.value.currentTime = Math.max(0, audioElement.value.currentTime - 10)
    }
}

watch(() => props.audioUrl, (newUrl) => {
    if (newUrl && audioElement.value) {
        audioElement.value.src = newUrl
        audioElement.value.load()
    }
})

onMounted(() => {
    audioElement.value = new Audio(props.audioUrl)
    if (audioElement.value) {
        audioElement.value.addEventListener('timeupdate', updateTime)
        audioElement.value.addEventListener('loadedmetadata', () => {
            duration.value = formatTime(audioElement.value!.duration)
            audioDuration.value = audioElement.value!.duration
        })
    }
})
</script>