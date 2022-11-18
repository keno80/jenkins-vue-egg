import { http } from '@/utils/http'
import { ISaveConfig } from './types'

/**
 * 获取项目配置列表
 */

export const configList = () => {
  return http.get('/config')
}

/**
 * 新增项目配置
 */

export const saveConfig = (data: ISaveConfig) => {
  return http.post('/config', data)
}

/**
 * 编辑项目配置
 */

export const editConfig = (data: ISaveConfig) => {
  return http.put('/config', data)
}

/**
 * 删除项目配置
 */

export const deleteConfig = (id: number) => {
  return http.delete(`/config/${id}`)
}
