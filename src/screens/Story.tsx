import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Video } from "expo-av";
import { SharedElement } from "react-navigation-shared-element";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { SnapchatRoutes } from "../types";

interface StoryProps {
  navigation: NavigationProp<SnapchatRoutes, "Story">;
  route: RouteProp<SnapchatRoutes, "Story">;
}

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const { height } = Dimensions.get("window");

const Story: React.FC<StoryProps> = ({ route, navigation }) => {
  const { story } = route.params;

  const isGestureActive = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isGestureActive.value = true;
    },
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
      isGestureActive.value = false;
    },
  });

  const storyStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translateX.value * scale },
        { translateY: translateY.value * scale },
        { scale },
      ],
    };
  });

  const borderStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isGestureActive ? 24 : 0),
  }));

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[storyStyle]}>
        <SharedElement id={story.id} style={styles.container}>
          {!story.video ? (
            <Animated.Image
              source={story.source}
              style={[styles.image, borderStyle]}
            />
          ) : (
            <AnimatedVideo
              source={story.video}
              rate={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={[StyleSheet.absoluteFill, borderStyle]}
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
