import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='firstWelcomeText' />
      <Stack.Screen name='nickName' />
      <Stack.Screen name='gender' />
      <Stack.Screen name='age' />
      <Stack.Screen name='secondWelcomeText' />
      <Stack.Screen name='smoking' />
      <Stack.Screen name='sleepTime' />
      <Stack.Screen name='wakeUpTime' />
      <Stack.Screen name='snoring' />
      <Stack.Screen name='cleaningCycle' />
      <Stack.Screen name='drinking' />
      <Stack.Screen name='absentDay' />
      <Stack.Screen name='thirdWelcomeText' />
      <Stack.Screen name='bugCatching' />
      <Stack.Screen name='mbti' />
      <Stack.Screen name='hobby' />
      <Stack.Screen name='fourthWelcomeText' />
      <Stack.Screen name='rules' />
      <Stack.Screen name='fifthWelcomeText' />
      <Stack.Screen name='kakaoId' />
      <Stack.Screen name='completeText' />
    </Stack>
  );
}
