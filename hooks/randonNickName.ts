import nicknameData from "@/assets/data/randomNickName.json";

export const generateRandomNickname = () => {
  const adjs = nicknameData?.adjectives || [];
  const animals = nicknameData?.animals || [];

  // 배열이 비어있거나 유효하지 않은 경우 기본값 사용
  if (adjs.length === 0 || animals.length === 0) {
    return "친절한 사자";
  }

  const randomAdjIndex = Math.floor(Math.random() * adjs.length);
  const randomAnimalIndex = Math.floor(Math.random() * animals.length);

  const randomAdj = adjs[randomAdjIndex]?.trim() || "친절한";
  const randomAnimal = animals[randomAnimalIndex]?.trim() || "사자";

  // 빈 문자열 체크
  if (!randomAdj || !randomAnimal) {
    return "친절한 사자";
  }

  return `${randomAdj} ${randomAnimal}`;
};
