import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Stories from "../screens/Stories";
import Story from "../screens/Story";

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen name="Story" component={Story} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
