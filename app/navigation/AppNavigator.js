import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NutritionScreen from '../screens/NutritionScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="Nutrition" component={NutritionScreen} />
  </Stack.Navigator>
)

export default AppNavigator;
