import React from "react";
import { Text, View } from "../components/Themed";
import { Image, Platform, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

export const AuthScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}>
      <View style={styles.container}>
        <View
          style={{
            borderWidth: 2,
            borderColor: Colors[colorScheme ?? "light"].tint,
            padding: 16,
            borderRadius: 16,
          }}>
          <Image
            source={require("../assets/images/login.png")}
            style={{
              width: 60,
              height: 60,
              alignSelf: "center",
              marginBottom: 16,
            }}
          />
          <Text style={styles.title}>Sign Up</Text>
          <View
            style={[
              styles.separator,
              {
                backgroundColor: Colors[colorScheme ?? "light"].tint,
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.select({ android: 30 }),
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: "auto",
  },
});
