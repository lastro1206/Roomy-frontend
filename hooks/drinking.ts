export const convertDrinkingToEnum = (
  drinking: string
): "VERY_OFTEN" | "FREQUENTLY" | "SOMETIMES" | "RARELY" | "NEVER" | null => {
  const drinkingMap: Record<string, "VERY_OFTEN" | "FREQUENTLY" | "SOMETIMES" | "RARELY" | "NEVER"> = {
    "거의 하지 않는다": "RARELY",
    "주 1~2회 한다": "SOMETIMES",
    "그 이상 한다": "FREQUENTLY",
  };
  return drinkingMap[drinking] ?? null;
};

export const convertEnumToDrinking = (
    enumValue: "VERY_OFTEN" | "FREQUENTLY" | "SOMETIMES" | "RARELY" | "NEVER"
): string | null => {
  const enumMap: Record<"VERY_OFTEN" | "FREQUENTLY" | "SOMETIMES" | "RARELY" | "NEVER", string> = {
    NEVER: "거의 하지 않는다",
    RARELY: "거의 하지 않는다",
    SOMETIMES: "주 1~2회 한다",
    FREQUENTLY: "그 이상 한다",
    VERY_OFTEN: "그 이상 한다",
  };
  return enumMap[enumValue] ?? null;
};

