import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Story } from "../types";

interface StoryThumbnailProps {
  story: Story;
}

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

const StoryThumbnail: React.FC<StoryThumbnailProps> = ({ story }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        navigation.navigate("Story", { story });
      }}
    >
      <View style={[styles.container]}>
        <Image source={story.source} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
});

export default StoryThumbnail;