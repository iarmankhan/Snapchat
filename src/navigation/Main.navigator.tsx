import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Stories from "../screens/Stories";
import Story from "../screens/Story";
import { SnapchatRoutes } from "../types";

const Stack = createSharedElementStackNavigator<SnapchatRoutes>();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: { backgroundColor: "transparent" },
        }}
        mode="modal"
      >
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen
          name="Story"
          component={Story}
          sharedElements={(route) => {
            return [route.params.story.id];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
