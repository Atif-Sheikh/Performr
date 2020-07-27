import * as React from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, View} from 'native-base';
import {Provider} from 'react-redux';

import '@react-native-firebase/app';
import '@react-native-firebase/auth';

import {
  Login,
  Signup,
  Home,
  Post,
  Profile,
  Message,
  Chatting,
} from './src/component';

import store from './src/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// console.disableYellowBox = true;

function App() {
  Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
  Platform.OS === 'android' && StatusBar.setBackgroundColor('#1d7488');

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Login">
            <Stack.Screen name="Home" component={HomeNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Chat" component={Chatting} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-man' : 'ios-man-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle-sharp' : 'add-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} style={{color: color}} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1d7488',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Messages" component={Message} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default App;
