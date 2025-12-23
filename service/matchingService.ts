import axios, { isAxiosError } from "axios";

interface Profile {
  id: number;
  gender: string;
  name: string;
  birthYear: number;
  kakaoId: string;
  mbti: string;
  smoker: boolean;
  snoring: boolean;
  bugKiller: boolean;
  sleepTime: number;
  wakeTime: number;
  cleaningCycle:
    | "DAILY"
    | "EVERY_2_3_DAYS"
    | "WEEKLY"
    | "EVERY_2_WEEKS"
    | "MONTHLY"
    | "RARELY";
  drinkingStyle: "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER";
  absentDays: string[];
  hobby: string;
  selfDescription: string;
  roommateDescription: string;
  selfIntroductionEmbedding: number[];
  roommateCriteriaEmbedding: number[];
}

interface Preferences {
  targetGender: string;
  targetAgeRange: [number | null, number | null];
  preferNonSmoker: boolean;
  preferGoodAtBugs: boolean;
  preferQuietSleeper: boolean;
  preferNonDrinker: boolean;
}

interface MatchingRequest {
  myProfile: Profile;
  preferences: Preferences;
  candidates: Profile[];
}

export const matchingService = {
  postMatching: async (body: MatchingRequest) => {
    const baseUrl = process.env.EXPO_PUBLIC_AI_API_URL;

    const apiUrl = `${baseUrl}/matching/match`;

    console.log("=== API 요청 시작 ===");
    console.log("Base URL:", baseUrl);
    console.log("Full URL:", apiUrl);
    console.log("요청 본문:", JSON.stringify(body, null, 2));

    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30초 타임아웃
      });

      console.log("=== API 응답 성공 ===");
      console.log("상태 코드:", response.status);
      console.log("응답 데이터:", JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.error("=== API 요청 실패 ===");

      if (isAxiosError(error)) {
        console.error("에러 타입: Axios Error");
        console.error("요청 URL:", error.config?.url);
        console.error("요청 메서드:", error.config?.method);
        console.error(
          "요청 본문:",
          JSON.stringify(error.config?.data, null, 2)
        );
        console.error("응답 상태:", error.response?.status);
        console.error(
          "응답 데이터:",
          JSON.stringify(error.response?.data, null, 2)
        );
        console.error("에러 메시지:", error.message);

        if (error.response) {
          // 서버가 응답했지만 에러 상태 코드
          throw new Error(
            `서버 오류 (${error.response.status}): ${
              error.response.data?.message || error.message
            }`
          );
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못함
          throw new Error(
            `서버에 연결할 수 없습니다. 네트워크를 확인해주세요.`
          );
        } else {
          // 요청 설정 중 에러 발생
          throw new Error(`요청 설정 오류: ${error.message}`);
        }
      } else {
        console.error("예상치 못한 에러:", error);
        throw new Error(`알 수 없는 오류가 발생했습니다: ${error}`);
      }
    }
  },
};
