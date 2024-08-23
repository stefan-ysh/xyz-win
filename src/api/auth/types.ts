import { ResponseData } from "@/types";

/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  mobilePhoneNumber: string;
  /**
   * 验证码
   */
  verifyCode: string;
  /**
   * 区号 默认 +86
   */
  areaCode?: string;
}

/**
 * 登录成功数据
 */
interface LoginSuccessData {
  data: {
    data: {
      isSignUp: boolean;
      showNewbieGuide: boolean;
      newbieGuideFeatureGroup: string;
      subscriptionGuideFeatureGroup: string;
      user: {
        type: string;
        uid: string;
        avatar: {
          picture: {
            picUrl: string;
            largePicUrl: string;
            middlePicUrl: string;
            smallPicUrl: string;
            thumbnailUrl: string;
            format: string;
            width: number;
            height: number;
          };
        };
        nickname: string;
        isNicknameSet: boolean;
        gender: string;
        isCancelled: boolean;
        readTrackInfo: Record<string, unknown>;
        ipLoc: string;
        birthYear: number;
        industry: string;
        wechatUserInfo: {
          nickName: string;
        };
        phoneNumber: {
          mobilePhoneNumber: string;
          areaCode: string;
        };
        phoneNumberNeeded: boolean;
        jikeUserInfo: {
          nickname: string;
        };
        isBlockedByViewer: boolean;
        isInvited: boolean;
        userCanDebug: boolean;
      };
    };
  };
  "x-jike-access-token": string;
  "x-jike-refresh-token": string;
}

/**
 * 登录响应
 */
export interface LoginResult extends ResponseData<LoginSuccessData> {}
/**
 * 发送验证码请求参数
 */
export interface MsgCodeData {
  /**
   * 手机号
   */
  mobilePhoneNumber: string;

  /**
   * 区号 默认 +86
   */
  areaCode?: string;
}

/**
 * 发送验证码响应
 */
export interface MsgCodeResult extends ResponseData<{}> {}

/**
 * 刷新token请求参数
 */
export interface RefreshTokenData {
  /**
   * 访问令牌
   */
  "x-jike-access-token": string;
  /**
   * 刷新令牌
   */
  "x-jike-refresh-token": string;
}

/**
 * 刷新token成功数据
 */
interface RefreshTokenSuccessData {
  "x-jike-access-token": string;
  success: boolean;
  "x-jike-refresh-token": string;
}

/**
 * 刷新token响应
 */
export interface RefreshTokenResult extends ResponseData<RefreshTokenSuccessData> {}
