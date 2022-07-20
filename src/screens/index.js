import 'react-native-gesture-handler';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
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
import Cart from './dashboard/cart';
import {Link} from '@react-navigation/native';
import Coupon from './dashboard/coupon';
import Order404 from './notfound/order';
import {useSelector} from 'react-redux';
import Delivery from './dashboard/delivery';
import Payment from './dashboard/payment';
import Profile from './dashboard/profile';
import Splash from './splash/index';
import History from './dashboard/history';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

// auth navigation

function HomeNav({navigation}) {
  const cart = useSelector(state => state.chart.chart);
  const user = useSelector(state => state.user.user);
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
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="rgba(0, 0, 0, 0.5)"
                />
                <Link
                  style={{marginRight: 20}}
                  to={cart.length === 0 ? '/Order' : '/Cart'}>
                  <Ionicons
                    style={{marginRight: 20}}
                    name="cart-outline"
                    size={24}
                    color="rgba(0, 0, 0, 0.5)"
                  />
                </Link>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{
                    marginRight: 20,
                  }}>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 50,
                    }}
                    source={{uri: user.img}}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

// dashboard auth
function Router() {
  const cart = useSelector(state => state.chart.chart);
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
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
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
          name="Profile"
          component={Profile}
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
                  }}></Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="History"
          component={History}
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
                  }}></Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
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
                  My Cart
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Coupon"
          component={Coupon}
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
                  Coupon
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Delivery"
          component={Delivery}
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
                  Checkout
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
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
                  Payment
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Order"
          component={Order404}
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
                  Orders
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
                <Link to={cart.length === 0 ? '/Order' : '/Cart'}>
                  <Ionicons
                    style={{marginRight: 20}}
                    name="cart-outline"
                    size={24}
                    color="black"
                  />
                </Link>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNav}
          options={{
            // swipeEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default Router;
