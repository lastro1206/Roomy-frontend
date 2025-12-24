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

export interface NoticePayload {
  title: string;
  content: string;
}

// Repair Analyze
export interface RepairAnalyzeRequest {
  existingReportIds: number[];
  totalReportCount: number;
  floor: string;
  roomNumber?: string | null;
}

export interface RepairAnalysis {
  item: string;
  issue: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  priority_score: number;
  reasoning: string;
  description: string;
}

export interface DuplicateReport {
  reportId: number;
  similarity: number;
  description: string;
  location: string;
  image_url: string;
}

export interface RepairAnalyzeResponse {
  analysis: RepairAnalysis | null;
  duplicates: DuplicateReport[];
  is_new: boolean;
  newReportId: number;
}

// Repair Report
export interface RepairReport {
  id: number;
  floor: string;
  roomNumber: string | null;
  item: string;
  issue: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  priorityScore: number;
  description: string;
  imagePath: string | null;
  status: "PENDING" | "COMPLETED";
  createdAt: string;
}

export interface RepairReportStatusPayload {
  status: "PENDING" | "COMPLETED";
}

export interface RepairReportDescriptionPayload {
  description: string;
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
  postMatching: async (body: MatchingPreferences, userId: number) => {
    console.log("[POST /matching] payload:", body, "userId:", userId);
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
      return response.data;
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

  // Repair Analyze
  analyzeRepair: async (body: RepairAnalyzeRequest) => {
    console.log("[POST /repair/analyze] payload:", body);
    
    try {
      // JSON body로 전송 (Postman과 동일한 형식)
      const requestBody = {
        existingReportIds: body.existingReportIds,
        totalReportCount: body.totalReportCount,
        floor: body.floor,
        roomNumber: body.roomNumber || null,
      };
      
      console.log("[POST /repair/analyze] request body:", JSON.stringify(requestBody, null, 2));
      
      // axios를 사용하여 JSON body로 전송
      const response = await axios.post(`${BASE_URL}/repair/analyze`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      
      console.log("[POST /repair/analyze] response:", response.data);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[POST /repair/analyze] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error("[POST /repair/analyze] error:", err.message || err);
      }
      throw err;
    }
  },

  // Repair Reports
  getRepairReports: async (params?: { status?: "PENDING" | "COMPLETED" }) => {
    console.log("[GET /repair-reports] params:", params);
    try {
      const response = await axios.get(`${BASE_URL}/repair-reports`, {
        params,
      });
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[GET /repair-reports] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error("[GET /repair-reports] error:", err.message || err);
      }
      throw err;
    }
  },

  getRepairReportById: async (id: number | string) => {
    console.log("[GET /repair-reports/{id}] id:", id);
    try {
      const response = await axios.get(`${BASE_URL}/repair-reports/${id}`);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[GET /repair-reports/{id}] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error("[GET /repair-reports/{id}] error:", err.message || err);
      }
      throw err;
    }
  },

  updateRepairReportStatus: async (
    id: number | string,
    payload: RepairReportStatusPayload
  ) => {
    console.log("[PATCH /repair-reports/{id}/status] id:", id, "payload:", payload);
    try {
      const response = await axios.patch(
        `${BASE_URL}/repair-reports/${id}/status`,
        payload
      );
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[PATCH /repair-reports/{id}/status] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error(
          "[PATCH /repair-reports/{id}/status] error:",
          err.message || err
        );
      }
      throw err;
    }
  },

  updateRepairReportDescription: async (
    id: number | string,
    payload: RepairReportDescriptionPayload
  ) => {
    console.log(
      "[PATCH /repair-reports/{id}/description] id:",
      id,
      "payload:",
      payload
    );
    try {
      const response = await axios.patch(
        `${BASE_URL}/repair-reports/${id}/description`,
        payload
      );
      return response.data;
    } catch (err: any) {
      if (err.response) {
        console.error(
          "[PATCH /repair-reports/{id}/description] error status:",
          err.response.status,
          "data:",
          err.response.data
        );
      } else {
        console.error(
          "[PATCH /repair-reports/{id}/description] error:",
          err.message || err
        );
      }
      throw err;
    }
  },
};

