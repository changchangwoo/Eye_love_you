import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import LoadingScreen from './screens/LoadingScreen';
import MainScreen from './screens/MainScreen';
import FontLoader from './component/FontLoader';
import TempScreen from './screens/temp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <FontLoader>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Temp" component={TempScreen} />

        </Stack.Navigator>
      </FontLoader>
    </NavigationContainer>
  );
};

export default App;
