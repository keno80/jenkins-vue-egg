<script setup lang="ts">
import { ref, onMounted, h, nextTick } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { IconPlus, IconEdit, IconDelete, IconPlayArrowFill, IconFile } from '@arco-design/web-vue/es/icon'
import { configList, saveConfig, deleteConfig, editConfig, buildProject, configDetail } from '@/api'
import { tableColumn } from './tableColumns'
import { ISaveConfig } from '@/api/types'
import io from '@/utils/socket'

io.emit('client_connect', () => {
  console.log('777');
  
})

const modelVisible = ref<boolean>(false)
const modelTitle = ref<string>('新增配置')
const isModelEdit = ref<boolean>(false)
const projectFormRef = ref()
const projectForm = ref<ISaveConfig>({
  projectName: '',
  gitUrl: '',
  gitBranch: '',
  buildCommand: '',
  uploadPath: '',
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

// 项目构建
const handleBuildProject = async (id: number) => {
  await buildProject(id)
  fetchConfigList()
}

// 删除配置
const handleDeleteConfig = async (id: number) => {
  Modal.warning({
    title: '警告',
    content: () => h('div', { style: 'text-align: center;' }, [h('span', '确定要删除该项目配置吗？')]),
    onBeforeOk: async () => {
      await deleteConfig(id)
      fetchConfigList()
      return true
    },
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

const detailModalVisible = ref<boolean>(false)
const detailTitle = ref<string>('')
// 打开配置详情弹窗
const handleOpenDetailModal = async (id: string) => {
  const data = await configDetail(id)
  detailTitle.value = data.projectName + '构建状态'
  detailModalVisible.value = true
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
        <a-button type="primary" style="margin-right: 5px" @click="handleOpenModal(1, record)">
          <template #icon>
            <IconEdit />
          </template>
        </a-button>
        <a-button type="primary" @click="handleOpenDetailModal(record._id)">
          <template #icon>
            <IconFile />
          </template>
        </a-button>
        <a-button type="primary" style="margin: 0 5px" @click="handleBuildProject(record._id)">
          <template #icon>
            <IconPlayArrowFill />
          </template>
        </a-button>
        <a-button type="primary" status="danger" @click="handleDeleteConfig(record._id)">
          <template #icon>
            <IconDelete />
          </template>
        </a-button>
      </template>
    </a-table>

    <!-- 新增保存配置 -->
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
          <a-textarea v-model="projectForm.buildCommand" placeholder="请输入构建命令，使用英文逗号隔开" />
        </a-form-item>
        <a-form-item field="uploadPath" label="上传路径：">
          <a-input v-model="projectForm.uploadPath" placeholder="请输入上传路径" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="detailModalVisible" :title="detailTitle" :mask-closable="false" :footer="false" width="70%"> </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.filter-tools {
  margin-bottom: 18px;
}
</style>
