import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";
import Colors from "../constants/Colors";
import { Input, Button } from "@rneui/themed";
import { ProjectType } from "../types/ProjectType";
import { addProject } from "../api/projectslist";
import { router } from "expo-router";



type ReactSetter = React.Dispatch<React.SetStateAction<string>>;

/**
 * @brief even handler for the creation of a new project
 * @param {string} projectName the name of the project
 * @param {string} color the color of the project
 * @param {string} userId the id of the user
 * @param {ReactSetter} setNameErr the setter for the name error message
 * @param {ReactSetter} setColorErr the setter for the color error message
 * @note this function will check if the name and the color are not empty
 * and will set error messages if they are
 * @returns {void}
 */
function onCreateProject(
  projectName : string,
  color       : string,
  userId      : string,
  setNameErr  : ReactSetter,
  setColorErr : ReactSetter
) {

  if (projectName.length === 0) {
    setNameErr("Veuillez remplir ce champ.");
  }
  if (color.length === 0) {
    setColorErr("Veuillez remplir ce champ.");
  }
  if (color.length === 0 || projectName.length === 0) {
    return;
  }

  const project: ProjectType = {
    id: undefined,
    userId: userId,
    color: color,
    title: projectName,
  };

  addProject(project).then((addedProject) => {
    if (addedProject != null) {
      router.push("/project/");
      router.setParams({
        projectId: addedProject.id ? addedProject.id : "",
        projectName: addedProject.title,
      });
    }
  });
}



export function CreateProject() {
  const userCredentials = useAuth();
  const colorScheme = useColorScheme();
  const [userId, setUserId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [colorErr, setColorErr] = useState<string>("");

  useEffect(() => {
    if (userCredentials.user) {
      setUserId(userCredentials.user.uid);
    }
  }, [userCredentials]);

  return (
    userId != "" && (
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Project</Text>
        <View
          style={[
            styles.card,
            { borderColor: Colors[colorScheme ?? "light"].text },
          ]}>
          <Text>Name :</Text>
          <Input
            value={projectName}
            onChangeText={setProjectName}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            errorMessage={nameErr}
          />
          <Text>Color :</Text>
          <Input
            value={color}
            onChangeText={setColor}
            containerStyle={{ marginBottom: 8 }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            errorMessage={colorErr}
          />
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => onCreateProject(projectName, color, userId, setNameErr, setColorErr)}>
            Create New Project
          </Button>
        </View>
      </View>
    )
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 3,
  },
});
