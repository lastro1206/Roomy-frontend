export const convertSleepTimeToNumber = (timeString: string): number | null => {
  const timeMap: Record<string, number> = {
    "오후 9시 이전": 8,
    "오후 9시~10시": 9,
    "오후 10시~11시": 10,
    "오후 11시~12시": 11,
    "오전 12시~1시": 12,
    "오전 1시~2시": 13,
    "오전 2시 이후": 14,
  };

  return timeMap[timeString] ?? null;
};

export const convertNumberToSleepTime = (number: number): string | null => {
  const numberMap: Record<number, string> = {
    8: "오후 9시 이전",
    9: "오후 9시~10시",
    10: "오후 10시~11시",
    11: "오후 11시~12시",
    12: "오전 12시~1시",
    13: "오전 1시~2시",
    14: "오전 2시 이후",
  };

  return numberMap[number] ?? null;
};
