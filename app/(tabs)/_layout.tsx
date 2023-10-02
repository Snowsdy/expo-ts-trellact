import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      safeAreaInsets={{ top: 8, right: 8, bottom: 8, left: 8 }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Log In",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pencil-square-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
