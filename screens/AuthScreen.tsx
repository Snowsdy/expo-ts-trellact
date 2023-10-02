import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { Image, Platform, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { Input } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { auth } from "../api/auth";



export const AuthScreen = () => {
  const colorScheme = useColorScheme();
  const [emailErr, setEmailErr] = useState("");
  const [passwdErr, setpasswdErr] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwdField, setPasswdField] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background }}>
      <View style={styles.container}>
        <View style={{ borderWidth: 2, borderColor: Colors[colorScheme ?? "light"].tint, padding: 16, borderRadius: 16, width: "80%", }}>
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
            value={emailField}
            onChangeText={setEmailField}
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
              <FontAwesome name="user" size={24} style={{ color: Colors[colorScheme ?? "light"].text, }} />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
            label={"Email"}
            placeholder="abc.xyz@efg.fr"
            errorStyle={{ color: "red" }}
            errorMessage={emailErr}
          />
          <Input
            value={passwdField}
            onChangeText={setPasswdField}
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
              <FontAwesome name="lock" size={24} style={{ color: Colors[colorScheme ?? "light"].text, }} />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
          />
          <Button radius={"sm"} type="solid" onPress={() => { auth(emailField, passwdField); }}>
            Sign Up
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
