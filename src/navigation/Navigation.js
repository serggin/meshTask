import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Driver from '../screens/Driver';
import Drivers from '../screens/Drivers';
import DriverRaces from '../screens/DriverRaces';

const Stack = createStackNavigator();

const Navigation = () => {
  console.log('Navigation');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drivers">
        <Stack.Screen name="Drivers" component={Drivers} />
        <Stack.Screen name="Driver" component={Driver} />
        <Stack.Screen name="DriverRaces" component={DriverRaces} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
