import { useGlobalSearchParams } from "expo-router";
import React from "react";
import CreateTaskslist from "../../screens/CreateTaskslist";

const AddTasksListScreen = () => {
  const local = useGlobalSearchParams<{
    projectId: string;
  }>();
  return <CreateTaskslist projectId={local.projectId} />;
};

export default AddTasksListScreen;
