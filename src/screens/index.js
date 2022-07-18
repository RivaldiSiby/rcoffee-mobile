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
import Product from './dashboard/products';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import Detail from './dashboard/detail';

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
              zIndex: 10,
              position: 'absolute',
            },
            overlayColor: 'rgba(242, 242, 242, 0.5)',
            drawerInactiveTintColor: '#6A4029',
            drawerActiveTintColor: '#6A4029',
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons
                  style={{marginRight: 20}}
                  name="cart-outline"
                  size={24}
                  color="rgba(0, 0, 0, 0.5)"
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
        useLegacyImplementation={true}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F2F2F2',
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
          name="Product"
          component={Product}
          options={{
            headerTitle: '',
            titleStyle: {
              color: 'red',
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '90%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  Products
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitle: '',
            titleStyle: {
              color: 'red',
              textAlign: 'center',
            },
            headerStyle: {
              backgroundColor: '#F2F2F2',
            },
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons
                  style={{marginRight: 20}}
                  name="cart-outline"
                  size={24}
                  color="black"
                />
              </View>
            ),
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
