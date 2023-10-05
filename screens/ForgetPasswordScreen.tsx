import { FontAwesome } from "@expo/vector-icons";
import { Input } from "@rneui/base";
import { Button } from "@rneui/themed";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Keyboard, Platform, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../api/auth";
import CustomOverlay from "../components/Overlay";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { router } from "expo-router";

export const ForgetPasswordScreen = () => {
  const colorScheme = useColorScheme();
  const [emailErr, setEmailErr] = useState("");
  const [emailField, setEmailField] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              Keyboard.dismiss();
              //   sendPasswordResetEmail(auth, emailField).then(() =>
              //     setIsVisible(!isVisible)
              //   );
              router.push("/confirmPassword");
            }}>
            Send Email Password Reset
          </Button>
        </View>
      </View>

      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(!isVisible)}>
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: Colors[colorScheme ?? "light"].background,
            }}>
            A mail has been sended. Check it out to reset your password !
          </Text>
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
