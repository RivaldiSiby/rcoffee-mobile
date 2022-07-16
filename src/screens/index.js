import 'react-native-gesture-handler';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './auth/login';
import Signup from './auth/signup';
import logo from '../assets/img/auth/logo.png';

const {Navigator, Screen} = createDrawerNavigator();

function Router() {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Screen
          name="Login"
          component={Login}
          options={{
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  Rcoffee
                </Text>
                <Image
                  style={{marginRight: '5%', width: 25, height: 25}}
                  source={logo}
                />
              </View>
            ),
          }}
        />
        <Screen
          name="Signup"
          component={Signup}
          options={{
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                  }}>
                  Rcoffee
                </Text>
                <Image
                  style={{marginRight: '5%', width: 25, height: 25}}
                  source={logo}
                />
              </View>
            ),
          }}
        />
      </Navigator>
    </>
  );
}

export default Router;
