import { FontAwesome } from "@expo/vector-icons";
import { Tabs, router, useGlobalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "../../constants/Colors";
import { Button } from "@rneui/themed";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function ProjectLayout() {
  const colorScheme = useColorScheme();
  const local = useGlobalSearchParams<{
    projectId: string;
    projectName: string;
  }>();

  return (
    <Tabs
      safeAreaInsets={{ top: 8, right: 8, bottom: 8, left: 8 }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerTitle: local.projectName,
        headerTitleAlign: "center",
        headerLeft: () => {
          return (
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={() => {
                router.push("/home/");
              }}
              icon={
                <TabBarIcon
                  color={Colors[colorScheme ?? "light"].text}
                  name="angle-left"
                />
              }
              titleStyle={{
                marginLeft: 8,
                color: Colors[colorScheme ?? "light"].text,
                borderRadius: 8,
              }}
              iconPosition="left">
              Go Home
            </Button>
          );
        },
        headerLeftContainerStyle: { paddingLeft: 8 },
      }}>
      <Tabs.Screen
        name="[projectId]"
        options={{
          title: "Project",
          tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addTasklist"
        options={{
          title: "Add Taskslist",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
