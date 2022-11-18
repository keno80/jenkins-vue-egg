<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'
import router from '@/router';

const route = useRoute()
const collapsed = ref<boolean>(false)
const defaultSelectedKeys = ref<string[]>([route.fullPath])

const onCollapse = (val: boolean) => {
  collapsed.value = val;
}

const handleMenuClick = (key: string) => {
  router.push(key)
}

</script>

<template>
  <div class="layout">
    <a-layout class="layout-demo" style="height: 100vh;">
      <a-layout-sider breakpoint="lg" :width="220" collapsible :collapsed="collapsed" @collapse="onCollapse">
        <div class="logo" />
        <a-menu :defaultSelectedKeys="defaultSelectedKeys" @menu-item-click="handleMenuClick">
          <a-menu-item key="/">
            <IconHome />
            首页
          </a-menu-item>
          <a-menu-item key="/project/list">
            <IconHome />
            项目列表
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <view class="header">前端自动化部署平台</view>
        <a-layout-content class="content">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;

  .arco-layout {
    background-color: #f7f7f7;

    .header {
      padding: 12px 18px;
      font-size: 18px;
      background: #fff;
    }

    .content {
      background: #fff;
      margin: 18px;
      padding: 18px;
    }
  }
}
</style>