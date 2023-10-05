import React from "react";
import { Text, View } from "../../components/Themed";
import { useLocalSearchParams } from "expo-router";

const ProjectScreen = () => {
  const local = useLocalSearchParams();
  return (
    <View>
      <Text>Voici l'id du projet : {local.projectId as string}</Text>
    </View>
  );
};

export default ProjectScreen;
