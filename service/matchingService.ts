import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export interface UserPayload {
  id?: number;
  name?: string;
  gender?: string;
  birthYear?: number;
  mbti?: string;
  smoker?: boolean;
  sleepTime?: number;
  wakeTime?: number;
  snoring?: boolean;
  cleaningCycle?: string;
  drinkingStyle?: string;
  bugKiller?: boolean;
  hobby?: string;
  kakaoId?: string;
  absentDays?: string[];
  selfDescription?: string;
  roommateDescription?: string;
}

export interface MatchingPreferences {
  preferGoodAtBugs: boolean;
  preferNonSmoker: boolean;
  preferQuietSleeper: boolean;
}

export interface MatchRequest {
  myProfile: UserPayload & { id: number };
  preferences: MatchingPreferences;
  candidates: UserPayload[]; // 서버 스키마상 동일 필드를 사용
}

export interface NoticePayload {
  title: string;
  content: string;
}

// ----- 서비스 구현 -----
export const apiService = {
  // User
  postUser: async (body: UserPayload) => {
    console.log("[POST /users] payload:", body);
    const response = await axios.post(`${BASE_URL}/users`, body);
    return response.data;
  },

  getUserById: async (id: number | string) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  },
  getUsers: async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },

  // Matching
  postMatching: async (body: MatchRequest, userId: number) => {
    console.log("[POST /matching] payload:", body);
    try {
      const response = await axios.post(
        `${BASE_URL}/matching`,
        body,
        {
          params: {
            userId: userId,
          },
        }
      );
      console.log("response", response.data);
      return response.data.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[POST /matching] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error("[POST /matching] error:", err.message || err);
      }
      throw err;
    }
  },

  // Notice
  createNotice: async (payload: NoticePayload) => {
    const response = await axios.post(`${BASE_URL}/notices`, payload);
    return response.data;
  },
  getNotices: async () => {
    const response = await axios.get(`${BASE_URL}/notices`);
    return response.data;
  },
};