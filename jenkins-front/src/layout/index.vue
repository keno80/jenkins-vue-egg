<script lang="ts" setup>
import {ref} from 'vue'
import {IconHome, IconCalendar} from '@arco-design/web-vue/es/icon'

const collapsed = ref<boolean>(false)

const onCollapse = (val: boolean) => {
  collapsed.value = val;
}

</script>

<template>
  <div class="layout">
    <a-layout class="layout-demo" style="height: 100vh;">
      <a-layout-sider
          breakpoint="lg"
          :width="220"
          collapsible
          :collapsed="collapsed"
          @collapse="onCollapse"
      >
        <div class="logo"/>
        <a-menu
            :defaultSelectedKeys="['0']"
        >
          <a-menu-item key="0">
            <IconHome/>
            Menu 1
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>