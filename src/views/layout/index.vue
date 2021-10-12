<script lang="ts" setup>
import Nav from './Nav.vue'
import Header from './Header.vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import {  ref } from 'vue';
  
     const collapsed = ref<boolean>(false);
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Nav></Nav>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
     
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <Header/>
      </a-layout-header>

      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
         <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  
</template>

<style lang="scss" scoped>
.layout{
    height:100%;
  .ant-layout-header{
       background: #fff; padding: 0;display: flex;align-items: center;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
     &:hover{color: #1890ff;}
    }
  
  }
}
</style>