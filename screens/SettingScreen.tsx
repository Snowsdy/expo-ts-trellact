import { FontAwesome } from "@expo/vector-icons";
import { Button, ButtonGroup, Icon, Input, ListItem } from "@rneui/themed";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Keyboard, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { updateUserPassword } from "../api/auth";
import CustomOverlay from "../components/Overlay";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";

export const SettingScreen = () => {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [toogleUpdatePassword, setToogleUpdatePassword] = useState(false);
  const [passwdField, setPasswdField] = useState("");
  const [passwdErr, setpasswdErr] = useState("");
  const [tooglePassword, setTooglePassword] = useState(false);
  const [user, setUser] = useState<User>();
  const userCredentials = useAuth();

  useEffect(() => {
    if (userCredentials.user) {
      setUser(userCredentials.user);
    }
  }, [userCredentials]);

  const getOverlayAction = (value: number) => {
    switch (value) {
      case 0:
        // ? Supression des données & du compte
        setIsVisible(false);
        break;

      case 1:
        // * Annuler l'opération
        setIsVisible(false);
        break;

      default:
        break;
    }
    setSelectedIndex(undefined);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}>
      <ListItem.Accordion
        containerStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          columnGap: 8,
        }}
        icon={
          <FontAwesome
            name="chevron-down"
            color={Colors[colorScheme ?? "light"].text}
            size={14}
          />
        }
        android_disableSound
        leftRotate={false}
        content={
          <>
            <FontAwesome
              name="user"
              color={Colors[colorScheme ?? "light"].text}
              size={18}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{ color: Colors[colorScheme ?? "light"].text }}>
                User Settings
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}>
        {user && (
          <ListItem
            onPress={() => setToogleUpdatePassword(!toogleUpdatePassword)}
            containerStyle={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
            }}>
            <FontAwesome
              name="user-secret"
              size={18}
              color={Colors[colorScheme ?? "light"].text}
            />
            <ListItem.Content>
              <ListItem.Title
                style={{ color: Colors[colorScheme ?? "light"].text }}>
                Change Password
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}

        <ListItem
          onPress={() => setIsVisible(!isVisible)}
          containerStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}>
          <Icon
            name="trash-can-outline"
            type="material-community"
            color="red"
          />
          <ListItem.Content>
            <ListItem.Title style={{ color: "red" }}>
              Delete my Account
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </ListItem.Accordion>
      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(!isVisible)}>
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "red",
            }}>
            Confirm Deleting Account ? All your data will be lost !
            <ButtonGroup
              selectedIndex={selectedIndex}
              onPress={getOverlayAction}
              buttonStyle={{ padding: 10 }}
              buttons={[
                <Text style={{ color: "red" }}>Yes</Text>,
                <Text style={{ color: "orange" }}>Cancel</Text>,
              ]}
            />
          </Text>
        </View>
      </CustomOverlay>

      {user && (
        <CustomOverlay
          overlayStyle={{ width: "60%" }}
          isVisible={toogleUpdatePassword}
          onBackdropPress={() => {
            setToogleUpdatePassword(!toogleUpdatePassword);
            setPasswdField("");
          }}>
          <View
            style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
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
              secureTextEntry={!tooglePassword}
              errorMessage={passwdErr}
              leftIcon={
                <FontAwesome
                  name="lock"
                  style={{
                    color: Colors[colorScheme ?? "light"].background,
                  }}
                  size={24}
                />
              }
              rightIcon={
                tooglePassword === false ? (
                  <FontAwesome
                    name="eye"
                    onPress={() => setTooglePassword(!tooglePassword)}
                    style={{
                      color: Colors[colorScheme ?? "light"].background,
                    }}
                    size={24}
                  />
                ) : (
                  <FontAwesome
                    name="eye-slash"
                    onPress={() => setTooglePassword(!tooglePassword)}
                    style={{
                      color: Colors[colorScheme ?? "light"].background,
                    }}
                    size={24}
                  />
                )
              }
              leftIconContainerStyle={{ marginRight: 8 }}
            />
            <Button
              radius={"sm"}
              type="solid"
              onPress={() => {
                Keyboard.dismiss();
                updateUserPassword(user, passwdField).then(() => {
                  alert("Password updated.");
                  setToogleUpdatePassword(!toogleUpdatePassword);
                });
              }}>
              Set New Password
            </Button>
          </View>
        </CustomOverlay>
      )}
    </SafeAreaView>
  );
};
