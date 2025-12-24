export const convertAbsentDaysToEnglish = (
    days: string[]
  ): ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] => {
    const dayMap: Record<string, "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"> = {
      월요일: "MONDAY",
      화요일: "TUESDAY",
      수요일: "WEDNESDAY",
      목요일: "THURSDAY",
      금요일: "FRIDAY",
      토요일: "SATURDAY",
      일요일: "SUNDAY",
    };
  
    return days
      .map((day) => dayMap[day])
      .filter((day): day is "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" => 
        day !== undefined
      );
  };
  
  export const convertEnglishToAbsentDays = (
    englishDays: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[]
  ): string[] => {
    const englishMap: Record<"MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY", string> = {
      MONDAY: "월요일",
      TUESDAY: "화요일",
      WEDNESDAY: "수요일",
      THURSDAY: "목요일",
      FRIDAY: "금요일",
      SATURDAY: "토요일",
      SUNDAY: "일요일",
    };
  
    return englishDays.map((day) => englishMap[day] ?? day);
  };