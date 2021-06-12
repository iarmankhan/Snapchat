import React from "react";
import { StyleSheet, View } from "react-native";

interface StoriesProps {}

const Stories: React.FC<StoriesProps> = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default Stories;
