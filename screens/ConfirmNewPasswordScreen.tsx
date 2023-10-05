import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Button } from "@rneui/themed";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  auth,
  confirmResetPassword,
  confirmResetPasswordCode,
} from "../api/auth";
import CustomOverlay from "../components/Overlay";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { router } from "expo-router";

export const ConfirmNewPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const [codeErr, setCodeErr] = useState("");
  const [codeField, setCodeField] = useState("");
  const [email, setEmail] = useState("");
  const [passwdField, setPasswdField] = useState("");
  const [passwdErr, setpasswdErr] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background, }}>
      <View style={styles.container}>
        <View style={{ borderWidth: 2, borderColor: Colors[colorScheme ?? "light"].tint, padding: 16, borderRadius: 16, width: "80%", }}>
          <Text style={styles.title}>Forget Password</Text>
          <View
            style={[
              styles.separator,
              {
                backgroundColor: Colors[colorScheme ?? "light"].tint,
              },
            ]}
          />
          <Input
            value={codeField}
            onChangeText={setCodeField}
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
              <FontAwesome name="lock" size={24} style={{ color: Colors[colorScheme ?? "light"].text, }} />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
            label={"Code"}
            errorStyle={{ color: "red" }}
            errorMessage={codeErr}
          />
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              Keyboard.dismiss();
              confirmResetPasswordCode(codeField).then((val) => {
                setEmail(val);
                setIsVisible(true);
              });
            }}>
            Send Email Password Reset
          </Button>
        </View>
      </View>

      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(!isVisible);
          setPasswdField("");
        }}>
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
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
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"New Password"}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            placeholder="***************"
            errorStyle={{ color: "red" }}
            secureTextEntry={!togglePassword}
            errorMessage={passwdErr}
            leftIcon={
              <FontAwesome name="lock" size={24} style={{ color: Colors[colorScheme ?? "light"].background, }} />
            }
            rightIcon={                
                <FontAwesome
                  name={togglePassword === false ? "eye-slash" : "eye"}
                  onPress={() => setTogglePassword(!togglePassword)}
                  size={24}
                  style={{
                    color: Colors[colorScheme ?? "light"].background,
                  }}
                />
            }
            leftIconContainerStyle={{ marginRight: 8 }}
          />
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              Keyboard.dismiss();
              router.push("/(tabs)/");
              confirmResetPassword(codeField, email).then(() => {
                // TODO: Show succes Popup
                router.push("/(tabs)/");
              });
            }}>
            Set New Password
          </Button>
        </View>
      </CustomOverlay>
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
