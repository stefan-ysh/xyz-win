/**
 * 通用响应数据类型
 */
export interface ResponseData<T> {
  /**
   * 响应状态码
   */
  code: number;
  /**
   * 响应消息
   */
  msg: string;
  /**
   * 响应数据
   */
  data: T;
}
