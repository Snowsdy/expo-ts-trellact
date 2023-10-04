import { Button, ButtonGroup, Icon, ListItem } from "@rneui/themed";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import CustomOverlay from "../components/Overlay";
import { Text, View } from "../components/Themed";

export const SettingScreen = () => {
  const colorScheme = useColorScheme();
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();

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
        <ListItem
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
    </SafeAreaView>
  );
};
