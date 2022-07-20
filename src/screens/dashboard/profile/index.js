import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);

  useEffect(() => {
    console.log(user);
    // const getPromosUser = async () => {
    //   try {
    //     dispatch(isLoading());
    //     const result = await getPromo();
    //     setPromos(result.data.data);
    //     dispatch(doneLoading());
    //   } catch (error) {
    //     console.log(error);
    //     dispatch(doneLoading());
    //     console.log(error.response.data.message);
    //     if (error.request.status !== 400) {
    //       ErrorsHandler(error.request.status);
    //     }
    //   }
    // };
    // getPromosUser();
  }, []);
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <View>
              <Text style={styles.textTitle}>My profile</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.textHead}>Your Information</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.textTriger}>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxProfile}>
              <View styles={styles.boxImgInfo}>
                <Image style={styles.imgProfile} source={{uri: user.img}} />
              </View>
              <View style={styles.boxTextInfo}>
                <Text style={styles.textBold}>{user.name}</Text>
                <Text style={styles.textInfo}>{user.email}</Text>
                <Text style={styles.textInfo}>{user.phone}</Text>
                <Text style={styles.textAddress}>{user.address}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => navigation.navigate('History')}
              style={styles.boxMenu}>
              <Text style={styles.textHead}>Order History</Text>
              <Ionicons
                size={24}
                color={'black'}
                name="chevron-forward-outline"></Ionicons>
            </Pressable>
            <View style={styles.boxMenu}>
              <Text style={styles.textHead}>Edit Password</Text>
              <Ionicons
                size={24}
                color={'black'}
                name="chevron-forward-outline"></Ionicons>
            </View>
            <View style={styles.boxMenu}>
              <Text style={styles.textHead}>FAQ</Text>
              <Ionicons
                size={24}
                color={'black'}
                name="chevron-forward-outline"></Ionicons>
            </View>
            <View style={styles.boxMenu}>
              <Text style={styles.textHead}>Help</Text>
              <Ionicons
                size={24}
                color={'black'}
                name="chevron-forward-outline"></Ionicons>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Edit Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Profile;
