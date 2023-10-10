import React from 'react';
import FontLoader from './component/FontLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import BlinkScreen from './screens/BlinkScreen';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import ResultScreen from './screens/ResultScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <FontLoader>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Blink" component={BlinkScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />

        </Stack.Navigator>
      </FontLoader>
    </NavigationContainer>


  );
}