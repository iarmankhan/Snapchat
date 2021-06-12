import React from "react";
import { StyleSheet, View } from "react-native";

interface StoryProps {}

const Story: React.FC<StoryProps> = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default Story;
