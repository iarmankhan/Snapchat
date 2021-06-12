import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { SnapchatRoutes } from "../types";

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">;
  route: RouteProp<SnapchatRoutes, "Story">;
}

const { height } = Dimensions.get("window");

const Story: React.FC<StoryProps> = ({ route, navigation }) => {
  const { story } = route.params;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationX, translationY }) => {
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onEnd: ({ velocityY, velocityX }) => {
      const goBack =
        snapPoint(translateY.value, velocityY, [0, height]) === height;

      if (goBack) {
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withSpring(0, { velocity: velocityX });
        translateY.value = withSpring(0, { velocity: velocityX });
      }
    },
  });

  const storyStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[storyStyle]}>
        <SharedElement id={story.id} style={styles.container}>
          {!story.video ? (
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
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>
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
