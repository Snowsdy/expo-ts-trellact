import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { TaskType } from "../types/TaskType";
import { updateTask } from "../api/tasks";

export const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const userCredentials = useAuth();
  const uid = userCredentials.user ? userCredentials.user.uid : "";
  const [emailErr, setEmailErr] = useState("");
  const [passwdErr, setpasswdErr] = useState("");

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
            width: "80%",
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
          <Input
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            leftIcon={
              <FontAwesome
                name="user"
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
                size={24}
              />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
            label={"Email"}
            placeholder="abc.xyz@efg.fr"
            errorStyle={{ color: "red" }}
            errorMessage={emailErr}
          />
          <Input
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            label={"Password"}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            textContentType="password"
            placeholder="abc.xyz@efg.fr"
            errorStyle={{ color: "red" }}
            secureTextEntry={true}
            errorMessage={passwdErr}
            leftIcon={
              <FontAwesome
                name="lock"
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
                size={24}
              />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
          />
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              router.push("/home");
              const task: TaskType = {
                id: "jgZYVkzXKNRhWcTr584g",
                badges: [
                  {
                    id: "Eb5QSlXSgaRWNzpe1Pe8",
                    color: "#52D433",
                    title: "1st badge",
                  },
                ],
                color: "#25FAE5",
                description: "Ceci est une description.",
                images: [
                  "https://picsum.photos/200/300",
                  "https://picsum.photos/300/300",
                  "https://picsum.photos/500/300",
                ],
                title: "1st Task TOTOTOTOTTO",
              };
              updateTask(task)
                .then(() => {
                  console.log("Transaction successfully committed!");
                })
                .catch((error) => {
                  console.log("Transaction failed: ", error);
                });
            }}>
            Test Ajout DB
          </Button>
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
    textAlign: "center",
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: "auto",
  },
});