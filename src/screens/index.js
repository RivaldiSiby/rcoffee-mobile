import 'react-native-gesture-handler';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
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
import {useSelector, useDispatch} from 'react-redux';
import Delivery from './dashboard/delivery';
import Payment from './dashboard/payment';
import Profile from './dashboard/profile';
import Splash from './splash/index';
import History from './dashboard/history';
import EditProfile from './dashboard/profile/Edit';
import Activation from './auth/activation';
import Codepass from './auth/codepass';
import Resetpass from './auth/resetpass';
import Transaction from './dashboard/transaction';
import Cart404 from './notfound/transaction';
import AddProduct from './admin/product';
import AddPromo from './admin/promo';
import EditProduct from './dashboard/detail/edit';
import Report from './admin/report';
import {onDelete} from '../redux/actionCreator/delete';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

// drawer navigate
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
                  to={cart.length === 0 ? '/Cart404' : '/Cart'}>
                  <Ionicons
                    style={{marginRight: 20}}
                    name="cart-outline"
                    size={24}
                    color="rgba(0, 0, 0, 0.5)"
                  />
                </Link>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', {msg: null})}
                  style={{
                    marginRight: 20,
                  }}>
                  {user.img === null ? (
                    <Ionicons
                      name="person-circle-outline"
                      color={'rgba(0, 0, 0, 0.5)'}
                      size={24}></Ionicons>
                  ) : (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                      }}
                      source={{uri: user.img}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

// Main router navigate
function Router() {
  const cart = useSelector(state => state.chart.chart);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
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
          name="Activation"
          component={Activation}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Codepass"
          component={Codepass}
          options={{
            headerShown: false,
            swipeEnabled: false,
          }}
        />
        <Stack.Screen
          name="Resetpass"
          component={Resetpass}
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
                    fontFamily: 'Poppins-Bold',
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
                    fontFamily: 'Poppins-Bold',
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
          name="EditProfile"
          component={EditProfile}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  Edit Profile
                </Text>
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
                    fontFamily: 'Poppins-Bold',
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
                    fontFamily: 'Poppins-Bold',
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
                    fontFamily: 'Poppins-Bold',
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
          name="Report"
          component={Report}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  Sales Chart
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  New Product
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="AddPromo"
          component={AddPromo}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  New Promo
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
                    fontFamily: 'Poppins-Bold',
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
                    fontFamily: 'Poppins-Bold',
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
          name="Transaction"
          component={Transaction}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  Transaction
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Order404"
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
                    fontFamily: 'Poppins-Bold',
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
          name="Cart404"
          component={Cart404}
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
                    fontFamily: 'Poppins-Bold',
                    fontSize: 18,
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 27,
                    color: 'black',
                  }}>
                  Cart
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
                {user.role === 'admin' ? (
                  <Link to={'/EditProduct'}>
                    <Ionicons
                      style={{marginRight: 20}}
                      name="pencil-outline"
                      size={24}
                      color="#6A4029"
                    />
                  </Link>
                ) : (
                  <Link to={cart.length === 0 ? '/Cart404' : '/Cart'}>
                    <Ionicons
                      style={{marginRight: 20}}
                      name="cart-outline"
                      size={24}
                      color="black"
                    />
                  </Link>
                )}
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
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
                <Pressable
                  onPress={() => dispatch(onDelete(true))}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: '#6A4029',
                  }}>
                  <Text>
                    <Ionicons
                      style={{marginRight: 20}}
                      name="trash-outline"
                      size={15}
                      color="white"
                    />
                  </Text>
                </Pressable>
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
