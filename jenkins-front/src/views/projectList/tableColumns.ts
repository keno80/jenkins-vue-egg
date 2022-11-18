import { TableColumnData } from '@arco-design/web-vue/es/table'

export const tableColumn: TableColumnData[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
  },
  {
    title: 'Git仓库',
    dataIndex: 'gitUrl',
  },
  {
    title: 'Git分支',
    dataIndex: 'gitBranch',
  },
  {
    title: '构建命令',
    dataIndex: 'buildCommand',
  },
  {
    title: '上传路径',
    dataIndex: 'uploadPath',
  },
  {
    title: '操作',
    slotName: 'options',
    align: 'center',
  },
]
