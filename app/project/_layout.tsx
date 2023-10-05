import { Stack } from "expo-router";

export default function ProjectLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="[projectId]"
        initialParams={["projectId"]}
        options={{ title: "Project" }}
      />
    </Stack>
  );
}
