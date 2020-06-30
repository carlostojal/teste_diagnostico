import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Upload from './src/screens/Upload';

const Stack = createStackNavigator();

export default function App() {
  return (
	  <NavigationContainer>
	  	<Stack.Navigator initialRouteName="Login">
		  	<Stack.Screen name="Home" component={Home} />
	  		<Stack.Screen name="Login" component={Login} />
	  		<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Upload" component={Upload} />
	  	</Stack.Navigator>
	  </NavigationContainer>
  )
}

