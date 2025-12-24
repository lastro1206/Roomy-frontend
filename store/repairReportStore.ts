import { RepairReport } from "@/service/macthing/macthingService";
import { create } from "zustand";

interface RepairReportStore {
  reports: RepairReport[];
  addReport: (report: Omit<RepairReport, "id" | "createdAt">) => void;
  removeReport: (id: number) => void;
  updateReport: (id: number, updates: Partial<RepairReport>) => void;
}

let nextId = 1;

// 초기 mockdata
const initialMockData: RepairReport[] = [
  {
    id: 1,
    floor: "3",
    roomNumber: "301",
    item: "변기",
    issue: "변기 막힘 및 역류 가능성",
    severity: "HIGH",
    priorityScore: 9,
    description: "화장실 변기가 다량의 휴지로 인해 막혀 작동하지 않는 상태이며, 바닥에 휴지가 떨어져 있는 등 위생 상태가 불량하여 즉각적인 조치가 필요합니다.",
    imagePath: null,
    status: "PENDING",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2시간 전
  },
  {
    id: 2,
    floor: "2",
    roomNumber: "205",
    item: "에어컨",
    issue: "에어컨 냉방 불가",
    severity: "MEDIUM",
    priorityScore: 6,
    description: "에어컨이 작동하지 않아 냉방이 되지 않습니다. 전원은 들어오지만 냉기가 나오지 않습니다.",
    imagePath: null,
    status: "PENDING",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5시간 전
  },
  {
    id: 3,
    floor: "4",
    roomNumber: "410",
    item: "문",
    issue: "문 손잡이 고장",
    severity: "LOW",
    priorityScore: 3,
    description: "방문 손잡이가 느슨해져서 제대로 작동하지 않습니다. 문을 열고 닫을 때 불편합니다.",
    imagePath: null,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1일 전
  },
  {
    id: 4,
    floor: "1",
    roomNumber: null,
    item: "복도 조명",
    issue: "복도 조명 깜빡임",
    severity: "MEDIUM",
    priorityScore: 5,
    description: "1층 복도 조명이 계속 깜빡이며 불안정합니다. 밤에 복도를 지나다닐 때 불편합니다.",
    imagePath: null,
    status: "PENDING",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12시간 전
  },
  {
    id: 5,
    floor: "3",
    roomNumber: "315",
    item: "샤워기",
    issue: "샤워기 물압 부족",
    severity: "LOW",
    priorityScore: 4,
    description: "샤워기에서 나오는 물의 압력이 약해서 샤워하기가 불편합니다.",
    imagePath: null,
    status: "PENDING",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30분 전
  },
  {
    id: 6,
    floor: "2",
    roomNumber: "220",
    item: "전기 콘센트",
    issue: "콘센트 작동 불가",
    severity: "HIGH",
    priorityScore: 8,
    description: "방 안 전기 콘센트가 작동하지 않아 전자기기를 사용할 수 없습니다. 안전상 문제가 될 수 있습니다.",
    imagePath: null,
    status: "PENDING",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1시간 전
  },
];

nextId = initialMockData.length + 1;

export const useRepairReportStore = create<RepairReportStore>((set) => ({
  reports: initialMockData,
  addReport: (reportData) => {
    const newReport: RepairReport = {
      ...reportData,
      id: nextId++,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      reports: [newReport, ...state.reports],
    }));
  },
  removeReport: (id) => {
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    }));
  },
  updateReport: (id, updates) => {
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      ),
    }));
  },
}));

