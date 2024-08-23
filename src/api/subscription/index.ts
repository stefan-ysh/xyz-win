import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { SubscriptionData, SubscriptionResult } from "./types";

/**
 * 订阅API
 *
 * @param data {SubscriptionData}
 * @returns {AxiosPromise<SubscriptionResult>}
 */
export function getSubscription(
  data: SubscriptionData
): AxiosPromise<SubscriptionResult> {
  return request({
    url: "/subscription",
    method: "post",
    data,
  });
}

/**
 * 剧集列表API
 *
 * @param data {SubscriptionData}
 * @returns {AxiosPromise<SubscriptionResult>}
 */
export function episodeList(data: { pid: string }): AxiosPromise<SubscriptionResult> {
  return request({
    url: "/episode_list",
    method: "post",
    data,
  });
}
/**
 * 剧集详情API
 *
 * @param data {SubscriptionData}
 * @returns {AxiosPromise<SubscriptionResult>}
 */
export function episodeDetail(data: { eid: string }): AxiosPromise<any> {
  return request({
    url: "/episode_detail",
    method: "post",
    data,
  });
}
