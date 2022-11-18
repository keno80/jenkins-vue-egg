<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { configList, saveConfig } from '@/api'
import tableColumn from './tableColumns'

const modelVisible = ref<boolean>(false)
const projectFormRef = ref()
const projectForm = reactive({
  projectName: '',
  gitUrl: '',
  gitBranch: '',
  buildCommand: '',
  uploadPath: ''
})

const listData = ref()
const fetchConfigList = async () => {
  listData.value = await configList()
}

const handleSaveConfig = async () => {
  await saveConfig(projectForm)
  projectFormRef.value.resetFields()
  fetchConfigList()
  return true
}

onMounted(() => {
  fetchConfigList()
})

</script>

<template>
  <div>
    <div class="filter-tools">
      <a-button type="primary" @click="modelVisible = true">
        <template #icon>
          <IconPlus />
        </template>
        新建项目
      </a-button>
    </div>

    <a-table :columns="tableColumn" :data="listData" />

    <a-modal v-model:visible="modelVisible" title="新增项目" :on-before-ok="handleSaveConfig" :mask-closable="false">
      <a-form :model="projectForm" ref="projectFormRef">
        <a-form-item field="projectName" label="项目名称：">
          <a-input v-model="projectForm.projectName" placeholder="请输入项目名称" />
        </a-form-item>
        <a-form-item field="gitUrl" label="Git路径：">
          <a-input v-model="projectForm.gitUrl" placeholder="请输入项目的Git仓库地址" />
        </a-form-item>
        <a-form-item field="gitBranch" label="Git分支：">
          <a-input v-model="projectForm.gitBranch" placeholder="请输入项目的Git分支" />
        </a-form-item>
        <a-form-item field="buildCommand" label="构建命令：">
          <a-input v-model="projectForm.buildCommand" placeholder="请输入构建命令" />
        </a-form-item>
        <a-form-item field="uploadPath" label="上传路径：">
          <a-input v-model="projectForm.uploadPath" placeholder="请输入上传路径" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.filter-tools {
  margin-bottom: 18px;
}
</style>