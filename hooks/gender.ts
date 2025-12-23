export const convertGenderToBackend = (gender: string): string => {
  const genderMap: Record<string, string> = {
    남: "MALE",
    여: "FEMALE",
  };
  return genderMap[gender] ?? gender;
};

export const convertBackendToGender = (backendGender: string): string => {
  const genderMap: Record<string, string> = {
    MALE: "남",
    FEMALE: "여",
  };
  return genderMap[backendGender] ?? backendGender;
};

