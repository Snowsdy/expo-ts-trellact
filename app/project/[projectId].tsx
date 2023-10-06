import React from "react";
import { useGlobalSearchParams } from "expo-router";
import ProjectScreen from "../../screens/ProjectScreen";

const ProjectLayout = () => {
  const global = useGlobalSearchParams<{
    projectId: string;
    projectName: string;
  }>();
  return (
    <ProjectScreen
      projectId={global.projectId}
      projectName={global.projectName}
    />
  );
};

export default ProjectLayout;
