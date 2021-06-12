import React, { useCallback, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import { Story } from "../types";

interface StoryThumbnailProps {
  story: Story;
}

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

const StoryThumbnail: React.FC<StoryThumbnailProps> = ({ story }) => {
  const navigation = useNavigation();

  const [opacity, setOpacity] = useState(1);

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        setOpacity(1);
      }
    }, [navigation])
  );

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        navigation.navigate("Story", { story });
        setOpacity(0);
      }}
    >
      <SharedElement id={story.id} style={[styles.container, { opacity }]}>
        <Image source={story.source} style={styles.image} />
      </SharedElement>
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
