import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/themed";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import { logOut } from "../../api/auth";
import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      safeAreaInsets={{ top: 8, right: 8, bottom: 8, left: 8 }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerTitle: "Project",
        headerLeft: () => {
          return (
            <Button
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={() => {
                logOut();
              }}
              icon={<TabBarIcon color="rgba(255,0,0,0.8)" name="angle-left" />}
              titleStyle={{
                marginLeft: 8,
                color: "rgba(255,0,0,0.8)",
                borderRadius: 8,
              }}
              iconPosition="left">
              Quit
            </Button>
          );
        },
        headerLeftContainerStyle: { paddingLeft: 16 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Create Project",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Select Project",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
