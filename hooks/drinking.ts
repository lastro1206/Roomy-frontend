export const convertDrinkingToEnum = (
  drinking: string
): "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER" | null => {
  const drinkingMap: Record<string, "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER"> = {
    "거의 하지 않는다": "RARELY",
    "주 1~2회 한다": "SOMETIMES",
    "그 이상 한다": "OFTEN",
  };
  return drinkingMap[drinking] ?? null;
};

export const convertEnumToDrinking = (
  enumValue: "VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER"
): string | null => {
  const enumMap: Record<"VERY_OFTEN" | "OFTEN" | "SOMETIMES" | "RARELY" | "NEVER", string> = {
    NEVER: "거의 하지 않는다",
    RARELY: "거의 하지 않는다",
    SOMETIMES: "주 1~2회 한다",
    OFTEN: "그 이상 한다",
    VERY_OFTEN: "그 이상 한다",
  };
  return enumMap[enumValue] ?? null;
};

