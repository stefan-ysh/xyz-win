<script setup>
import { ref } from 'vue'
import '@/assets/font/iconfont.css'

const isMax = ref(false)

function minWin() {
  window.electronAPI.minWin()
}

function maxWin() {
  isMax.value = true
  window.electronAPI.maxWin()
}

function restoreWin() {
  isMax.value = false
  window.electronAPI.restoreWin()
}

function closeWin() {
  window.electronAPI.closeWin()
}
</script>

<template>
  <div
    class="container"
    :style="{
      '-webkit-app-region': isMax ? 'no-drag' : 'drag'
    }"
  >
    <div class="logo">
      <img src="@/assets/image/Stella.png" alt="logo" width="19px" height="20px">
    </div>

    <div class="title">
      小宇宙
    </div>

    <div class="operate">
      <div class="min" @click="minWin()">
        <span class="iconfont">&#xeb0f;</span>
      </div>

      <div v-show="!isMax" class="max" @click="maxWin()">
        <span class="iconfont">&#xeb11;</span>
      </div>

      <div v-show="isMax" class="restore" @click="restoreWin()">
        <span class="iconfont">&#xeb10;</span>
      </div>

      <div class="close" @click="closeWin()">
        <span class="iconfont">&#xeaf2;</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  border-radius: 10px 10px 0 0;
  /* 禁用文本选择 */
  user-select: none;
  /* 窗口可拖拽 */
  /* -webkit-app-region: drag; */
}

.logo, .title, .operate {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo {
  width: 25%;
  padding-left: 10px;
  justify-content: flex-start;
}

.title {
  width: 50%;
  justify-content: center;
}

.operate {
  width: 25%;
  justify-content: flex-end;

  .min, .max, .restore, .close {
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    transition: all 0.25s linear;
    /* 禁用窗口拖拽 */
    -webkit-app-region: no-drag;

    &:hover {
      color: white;
      cursor: pointer;
    }
  }

  .min {
    &:hover {
      background-color: green;
    }
  }

  .max, .restore {
    &:hover {
      background-color: blue;
    }
  }

  .close {
    &:hover {
      background-color: red;
    }
  }
}
</style>