import 'react-native-gesture-handler';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './auth/login';
import Signup from './auth/signup';
import cart from '../assets/img/auth/cart.png';
import Landing from './auth/landing';
import Started from './auth/started';
import Forgotpass from './auth/forgotpass';
import Home from './dashboard/home';
import DrawerDashboard from './drawer/Dashboard.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

// auth navigation

function HomeNav() {
  return (
    <>
      <Drawer.Navigator
        useLegacyImplementation={true}
        drawerContent={props => <DrawerDashboard {...props} />}
        screenOptions={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F2F2F2',
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            // swipeEnabled: false,
            // headerShown: false,
            drawerStyle: {
              backgroundColor: '#F2F2F2',
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
              width: '80%',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 10,
            },
            overlayColor: 'rgba(242, 242, 242, 0.5)',
            drawerInactiveTintColor: '#6A4029',
            drawerActiveTintColor: '#6A4029',
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{marginRight: '15%', width: 24, height: 24}}
                  source={cart}
                />
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
function BottomNav() {
  return (
    <>
      <Bottom.Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F2F2F2',
          },
        }}>
        <Bottom.Screen
          name="User"
          component={HomeNav}
          options={{
            // swipeEnabled: false,
            headerShown: false,
          }}
        />
      </Bottom.Navigator>
    </>
  );
}
// dashboard auth
function Router() {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Started"
          component={Started}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Forgotpass"
          component={Forgotpass}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            swipeEnabled: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomNav}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default Router;
