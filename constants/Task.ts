import { StyleSheet } from "react-native";

export const TaskStyle = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0,
  },
  titleTask: {
    fontSize: 24,
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#fff",
    textAlign: "left",
  },
  descriptionTitleTask: {
    fontSize: 18,
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  descriptionTask: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
});
