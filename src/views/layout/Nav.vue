<script setup lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue'
  const  selectedKeys= ref<string[]>(['1']);
//   const vv = UserOutlined
</script>

<template>
<div>
     <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
</div>
</template>

<style lang='scss' scoped>

</style>