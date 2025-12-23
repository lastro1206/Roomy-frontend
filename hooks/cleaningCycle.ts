export const convertCleaningCycleToEnum = (
  cycle: string
):
  | "DAILY"
  | "EVERY_2_3_DAYS"
  | "WEEKLY"
  | "EVERY_2_WEEKS"
  | "MONTHLY"
  | "RARELY"
  | null => {
  const cycleMap: Record<
    string,
    | "DAILY"
    | "EVERY_2_3_DAYS"
    | "WEEKLY"
    | "EVERY_2_WEEKS"
    | "MONTHLY"
    | "RARELY"
  > = {
    "매일/수시로 한다": "DAILY",
    "주 1~2회 한다": "WEEKLY",
    "거의 하지 않는다": "RARELY",
  };
  return cycleMap[cycle] ?? null;
};
