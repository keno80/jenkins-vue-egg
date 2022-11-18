<script setup lang="ts">
import { ref, onMounted, h, nextTick } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { configList, saveConfig, deleteConfig, editConfig } from '@/api'
import { tableColumn } from './tableColumns'
import { ISaveConfig } from '@/api/types'

const modelVisible = ref<boolean>(false)
const modelTitle = ref<string>('新增配置')
const isModelEdit = ref<boolean>(false)
const projectFormRef = ref()
const projectForm = ref<ISaveConfig>({
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

// 新增/编辑配置
const handleSaveConfig = async () => {
  isModelEdit.value ? await editConfig(projectForm.value) : await saveConfig(projectForm.value)
  projectFormRef.value.resetFields()
  fetchConfigList()
  return true
}

// 删除配置
const handleDeleteConfig = async (id: number) => {
  Modal.warning({
    title: '警告',
    content: () => h('div', { style: 'text-align: center;' }, [
      h('span', '确定要删除该项目配置吗？')
    ]),
    onBeforeOk: async () => {
      await deleteConfig(id)
      fetchConfigList()
      return true
    }
  })
}

// 打开配置弹窗
const handleOpenModal = (type: number, record?: ISaveConfig) => {
  modelVisible.value = true
  modelTitle.value = type === 0 ? '新增配置' : '编辑配置'
  isModelEdit.value = type !== 0

  if (record) {
    nextTick(() => {
      projectForm.value = { ...record }
    })
  }
}

onMounted(() => {
  fetchConfigList()
})

</script>

<template>
  <div>
    <div class="filter-tools">
      <a-button type="primary" @click="handleOpenModal(0)">
        <template #icon>
          <IconPlus />
        </template>
        新建项目
      </a-button>
    </div>

    <a-table :columns="tableColumn" :data="listData">
      <template #options="{ record }">
        <a-button type="primary" style="margin-right: 5px;" @click="handleOpenModal(1, record)">编辑</a-button>
        <a-button type="primary" status="danger" @click="handleDeleteConfig(record._id)">删除</a-button>
      </template>
    </a-table>

    <a-modal v-model:visible="modelVisible" :title="modelTitle" :on-before-ok="handleSaveConfig" :mask-closable="false">
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