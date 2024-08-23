/**
 * 登录请求参数
 */
export interface SubscriptionData {
  /**
   * 用户id
   */
  uid?: string;
  /**
   * 订阅时间
   */
  subscribedAt: string;
  /**
   * 订阅id
   */
  id?: string;
}

/**
 * 订阅响应
 */
export interface SubscriptionResult {
  code: number;
  msg: string;
  data: SubscriptionData[];
  loadMoreKey?: { id: string; subscribedAt: string };
}
