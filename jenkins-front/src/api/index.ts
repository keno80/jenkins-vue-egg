import { http } from '@/utils/http'
import { ISaveConfig } from './types'

/**
 * 获取项目配置列表
 */

export const configList = () => {
  return http.get('/config')
}


/**
 * 新增/保存项目配置
 */

 export const saveConfig = (data: ISaveConfig) => {
  return http.post('/config', data)
}