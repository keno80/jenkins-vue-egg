import { http } from '@/utils/http'
import { ISaveConfig } from './types'

/**
 * 获取项目配置列表
 */

export const configList = () => {
  return http.get('/config')
}
