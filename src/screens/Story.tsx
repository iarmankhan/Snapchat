import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Video } from "expo-av";

import { SnapchatRoutes } from "../types";

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">;
  route: RouteProp<SnapchatRoutes, "Story">;
}

const { height } = Dimensions.get("window");

const Story: React.FC<StoryProps> = ({ route, navigation }) => {
  const { story } = route.params;
  return (
    <View style={styles.container}>
      {story.video ? (
        <Image source={story.source} style={styles.image} />
      ) : (
        <Video
          source={story.video}
          rate={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={[StyleSheet.absoluteFill]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default Story;
