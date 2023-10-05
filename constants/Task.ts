import { StyleSheet } from "react-native";

export const TaskStyle = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0,
  },
  titleTask: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#fff",
    marginBottom: 0,
  },
  descriptionTitleTask: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500",
    marginBottom: 10,
    color: "#fff",
  },
  descriptionTask: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 10,  
  },

});
