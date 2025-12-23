import { create } from "zustand";

interface OnboardingData {
  // 기본 정보
  name: string | null;
  gender: string | null;
  birthYear: number | null;
  kakaoId: string | null;
  mbti: string | null;

  // 생활 패턴
  smoker: boolean | null;
  snoring: boolean | null;
  bugKiller: boolean | null;
  sleepTime: number | null;
  wakeTime: number | null;
  cleaningCycle: "DAILY" | "EVERY_2_3_DAYS" | "WEEKLY" | "EVERY_2_WEEKS" | "MONTHLY" | "RARELY" | null;
  drinkingStyle: "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER" | null;
  absentDays: string[];

  // 추가 정보
  hobby: string | null;
  selfDescription: string | null;
  roommateDescription: string | null;
}

interface OnboardingStore extends OnboardingData {
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setBirthYear: (birthYear: number) => void;
  setKakaoId: (kakaoId: string) => void;
  setMbti: (mbti: string) => void;
  setSmoker: (smoker: boolean) => void;
  setSnoring: (snoring: boolean) => void;
  setBugKiller: (bugKiller: boolean) => void;
  setSleepTime: (sleepTime: number) => void;
  setWakeTime: (wakeTime: number) => void;
  setCleaningCycle: (cleaningCycle: "DAILY" | "EVERY_2_3_DAYS" | "WEEKLY" | "EVERY_2_WEEKS" | "MONTHLY" | "RARELY") => void;
  setDrinkingStyle: (drinkingStyle: "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER") => void;
  setAbsentDays: (absentDays: string[]) => void;
  setHobby: (hobby: string) => void;
  setSelfDescription: (selfDescription: string) => void;
  setRoommateDescription: (roommateDescription: string) => void;
  reset: () => void;
}

const initialState: OnboardingData = {
  name: null,
  gender: null,
  birthYear: null,
  kakaoId: null,
  mbti: null,
  smoker: null,
  snoring: null,
  bugKiller: null,
  sleepTime: null,
  wakeTime: null,
  cleaningCycle: null,
  drinkingStyle: null,
  absentDays: [],
  hobby: null,
  selfDescription: null,
  roommateDescription: null,
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBirthYear: (birthYear) => set({ birthYear }),
  setKakaoId: (kakaoId) => set({ kakaoId }),
  setMbti: (mbti) => set({ mbti }),
  setSmoker: (smoker) => set({ smoker }),
  setSnoring: (snoring) => set({ snoring }),
  setBugKiller: (bugKiller) => set({ bugKiller }),
  setSleepTime: (sleepTime) => set({ sleepTime }),
  setWakeTime: (wakeTime) => set({ wakeTime }),
  setCleaningCycle: (cleaningCycle) => set({ cleaningCycle }),
  setDrinkingStyle: (drinkingStyle) => set({ drinkingStyle }),
  setAbsentDays: (absentDays) => set({ absentDays }),
  setHobby: (hobby) => set({ hobby }),
  setSelfDescription: (selfDescription) => set({ selfDescription }),
  setRoommateDescription: (roommateDescription) => set({ roommateDescription }),
  reset: () => set(initialState),
}));

