import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { refreshTokenApi } from "@/api/auth/index";
import router from "@/router/index";
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    if (userStore.accessToken) {
      config.headers["x-jike-access-token"] = userStore.accessToken;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    console.log(code, msg);
    if (code === 200) {
      return response.data;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }
    console.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  async (error: any) => {
    console.log(error);

    if (error.response) {
      const { status, data, config } = error.response;
      if (status === 401) {
        const refreshSuccess = await refreshToken();
        if (refreshSuccess) {
          // 重新发送之前失败的请求
          return service(config);
        } else {
          router.push("/login");
          return Promise.reject(error);
        }
      }

      if (data) {
        const { code, msg } = data;
        // token 过期,重新登录
        if (code === "A0230") {
          router.push("/login");
        }
      }
    }
    return Promise.reject(error.message);
  }
);

const refreshToken = async () => {
  const userStore = useUserStoreHook();
  const { accessToken, refreshToken } = userStore;
  if (accessToken && refreshToken) {
    try {
      const res = await refreshTokenApi({
        "x-jike-access-token": accessToken,
        "x-jike-refresh-token": refreshToken,
      });
      console.log("refresh token", res);
      const { data, code } = res;
      if (code === 200) {
        userStore.setAccessToken(data["x-jike-access-token"]);
        userStore.setRefreshToken(data["x-jike-refresh-token"]);
        return true;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }
  return false;
};

export default service;
