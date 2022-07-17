import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Image, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {failLogin} from '../../redux/actionCreator/login';
import {clearChart} from '../../redux/actionCreator/chart';
import {clearUser} from '../../redux/actionCreator/user';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LogoutHandler} from '../../modules/auth/LogoutHandler';
import {doneLoading, isLoading} from '../../redux/actionCreator/loading';
const Drawer = createDrawerNavigator();

function DrawerDashboard({navigation}) {
  // logout
  const login = useSelector(state => state.login);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const logoutUserHandler = async () => {
    const logout = async () => {
      try {
        dispatch(isLoading());

        // logout API
        const refreshToken = login.auth['refreshkey'];
        console.log(refreshToken);
        await LogoutHandler(refreshToken);
        // clear storage
        dispatch(failLogin());
        dispatch(clearChart());
        dispatch(clearUser());
        dispatch(doneLoading());
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        dispatch(doneLoading());
      }
    };
    await logout();
  };
  return (
    <>
      <View style={style.container}>
        <DrawerContentScrollView>
          <View style={style.profileContainer}>
            <Image
              source={
                user.img === null
                  ? require('../../assets/img/auth/profil.png')
                  : user.img
              }
              style={style.profpict}
            />
            <Text style={style.username}>{user.name}</Text>
            <Text style={style.email}>{user.email}</Text>
          </View>
          <View style={style.menuContainer}>
            <View>
              <View style={style.menuList}>
                <Ionicons
                  name="person-circle-outline"
                  size={35}
                  color="#6A4029"
                />
                <Text style={style.menuText}>Edit Profile</Text>
              </View>
              <View style={style.menuList}>
                <Material name="cart-arrow-down" size={35} color="#6A4029" />
                <Text style={style.menuText}>Orders</Text>
              </View>
              <View style={style.menuList}>
                <Ionicons name="fast-food-outline" size={35} color="#6A4029" />
                <Text style={style.menuText}>All menu</Text>
              </View>
              <View style={style.menuList}>
                <Ionicons name="newspaper-outline" size={35} color="#6A4029" />
                <Text style={style.menuText}>Privacy policy</Text>
              </View>
              <View style={style.menuList}>
                <Awesome5 name="shield-alt" size={35} color="#6A4029" />
                <Text style={style.menuText}>Security</Text>
              </View>
            </View>
            <View style={style.menuList}>
              <TouchableOpacity onPress={() => logoutUserHandler()}>
                <Text style={style.menuTextEnd}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
}

export default DrawerDashboard;
