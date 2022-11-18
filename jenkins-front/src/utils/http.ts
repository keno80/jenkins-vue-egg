import axios from 'axios'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Message } from '@arco-design/web-vue'
import { StatusCodeEnum, StatusMsgEnum } from '@/Enum'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 30000,
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg, data } = response.data

    if (code === 200) {
      return data
    } else {
      Message.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    let message = ''

    const status = error.response?.status
    switch (status) {
      case StatusCodeEnum.ExpiredCode:
        message = StatusMsgEnum.ExpiredMsg
        break
      case StatusCodeEnum.RejectCode:
        message = StatusMsgEnum.RejectMsg
        break
      case StatusCodeEnum.NotFoundCode:
        message = StatusMsgEnum.NotFoundMsg
        break
      case StatusCodeEnum.ServiceError:
        message = StatusMsgEnum.ServiceMsg
        break
      default:
        message = StatusMsgEnum.DefaultMsg
    }

    Message.error(message)
    return Promise.reject(error)
  }
)

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config)
  },
}
