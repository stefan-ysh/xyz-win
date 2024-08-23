import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData, LoginResult, MsgCodeData, MsgCodeResult, RefreshTokenResult } from "./types";

/**
 * 登录
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
/**
 * 发送验证码
 *
 * @param data {Phone}
 * @returns
 */
export function sendMsgCode(data: MsgCodeData): AxiosPromise<MsgCodeResult> {
  return request({
    url: "/sendCode",
    method: "post",
    data,
  });
}
/**
 * 刷新token
 *
 * @param data {Phone}
 * @returns
 */
export function refreshTokenApi(data: {
  "x-jike-access-token": string;
  "x-jike-refresh-token": string;
}): AxiosPromise<RefreshTokenResult> {
  return request({
    url: "/refresh_token",
    method: "post",
    data,
  });
}
