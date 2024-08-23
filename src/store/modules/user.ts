// useUserStoreHook
import { defineStore } from "pinia";
import { loginApi } from "@/api/auth";
import { LoginData, LoginResult } from "@/api/auth/types";

interface UserState {
  accessToken: string;
  refreshToken: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    accessToken: localStorage.getItem("accessToken") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      localStorage.setItem("accessToken", token);
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
      localStorage.setItem("refreshToken", token);
    },
    async login(loginData: LoginData) {
      try {
        const { data } = await loginApi(loginData);
        this.setAccessToken(data["x-jike-access-token"] || "");
        this.setRefreshToken(data["x-jike-refresh-token"] || "");
        // this.setUsername(loginData.username || "");
        return data;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    logout() {
      this.setAccessToken("");
      this.setRefreshToken("");
      // You might want to add more logout logic here, like clearing local storage
    },
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken,
    isLoggedIn: (state) => !!state.accessToken,
  },
});

export function useUserStoreHook() {
  return useUserStore();
}
