import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Image, Text, View, TouchableOpacity, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {failLogin} from '../../redux/actionCreator/login';
import {clearChart} from '../../redux/actionCreator/chart';
import {clearUser} from '../../redux/actionCreator/user';
import {LogoutHandler} from '../../modules/auth/LogoutHandler';
import {doneLoading, isLoading} from '../../redux/actionCreator/loading';
import Loading from '../component/loading';
import {Link} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

function DrawerDashboard({navigation}) {
  // logout
  const Load = useSelector(state => state.loading.status);
  const login = useSelector(state => state.login);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const logoutUserHandler = async () => {
    try {
      dispatch(isLoading());
      // logout API
      const refreshToken = login.auth['refreshkey'];
      await LogoutHandler(refreshToken);
      dispatch(doneLoading());
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(doneLoading());
    }
    // clear storage

    dispatch(failLogin());
    dispatch(clearChart());
    dispatch(clearUser());
    navigation.replace('Login', {notif: 'Logout Success'});
  };

  return (
    <>
      <View style={style.container}>
        <DrawerContentScrollView>
          <View style={style.profileContainer}>
            {user.img === null ? (
              <Ionicons
                name="person-circle-outline"
                color={'white'}
                size={100}></Ionicons>
            ) : (
              <Image source={{uri: user.img}} style={style.profpict} />
            )}

            <Text style={style.username}>{user.name}</Text>
            <Text style={style.email}>{user.email}</Text>
          </View>
          <View style={style.menuContainer}>
            <View>
              <Pressable
                style={style.menuList}
                onPress={() =>
                  navigation.navigate('EditProfile', {edit: 'profile'})
                }>
                <Ionicons
                  name="person-circle-outline"
                  size={22}
                  color="#6A4029"
                />
                <Text style={style.menuText}>Edit Profile</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('History')}
                style={style.menuList}>
                <Material name="cart-arrow-down" size={22} color="#6A4029" />
                <Text style={style.menuText}>Orders</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate('Product', {categoryKey: 'all'})
                }
                style={style.menuList}>
                <Ionicons name="fast-food-outline" size={22} color="#6A4029" />
                <Text style={style.menuText}>All menu</Text>
              </Pressable>
              {user.role === 'costumer' ? (
                <>
                  <View style={style.menuList}>
                    <Ionicons
                      name="newspaper-outline"
                      size={22}
                      color="#6A4029"
                    />
                    <Text style={style.menuText}>Privacy policy</Text>
                  </View>
                </>
              ) : (
                <>
                  <Pressable
                    onPress={() => navigation.navigate('Report')}
                    style={style.menuList}>
                    <Ionicons name="reader-outline" size={22} color="#6A4029" />
                    <Text style={style.menuText}>Sales Report</Text>
                  </Pressable>
                </>
              )}
              {user.role === 'admin' ? (
                <Pressable
                  onPress={() => navigation.navigate('Coupon')}
                  style={style.menuList}>
                  <Ionicons
                    name="megaphone-outline"
                    size={22}
                    color="#6A4029"
                  />
                  <Text style={style.menuText}>Promo</Text>
                </Pressable>
              ) : (
                ''
              )}
            </View>
            <View style={style.menuList}>
              <TouchableOpacity onPress={() => logoutUserHandler()}>
                <Text style={style.menuTextEnd}>
                  Sign-Out
                  <Ionicons
                    name="arrow-forward-outline"
                    size={22}
                    color="#6A4029"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
}

export default DrawerDashboard;
