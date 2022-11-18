export enum StatusCodeEnum {
  ExpiredCode = 401,
  RejectCode = 403,
  NotFoundCode = 404,
  ServiceError = 500,
}

export enum StatusMsgEnum {
  ExpiredMsg = 'token 失效，请重新登录',
  RejectMsg = '拒绝访问',
  NotFoundMsg = '请求地址未找到',
  ServiceMsg = '服务器内部错误',
  DefaultMsg = '网络请求失败',
}
