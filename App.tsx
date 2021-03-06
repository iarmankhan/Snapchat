import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import MainNavigator from "./src/navigation/Main.navigator";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
});
