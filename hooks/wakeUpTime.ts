export const convertWakeUpTimeToNumber = (
  timeString: string
): number | null => {
  const timeMap: Record<string, number> = {
    "오전 6시 이전": 5,
    "오전 6시~7시": 6,
    "오전 7시~8시": 7,
    "오전 8시~9시": 8,
    "오전 9시~10시": 9,
    "오전 10시~11시": 10,
    "오전 11시 이후": 11,
  };

  return timeMap[timeString] ?? null;
};

export const convertNumberToWakeUpTime = (number: number): string | null => {
  const numberMap: Record<number, string> = {
    5: "오전 6시 이전",
    6: "오전 6시~7시",
    7: "오전 7시~8시",
    8: "오전 8시~9시",
    9: "오전 9시~10시",
    10: "오전 10시~11시",
    11: "오전 11시 이후",
  };

  return numberMap[number] ?? null;
};
