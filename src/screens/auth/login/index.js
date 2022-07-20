// img
import iconShow from '../../../assets/img/auth/iconShow.jpg';
import iconHide from '../../../assets/img/auth/iconHide.png';
import loginBg from '../../../assets/img/auth/loginBg.png';
import google from '../../../assets/img/auth/google.png';

import {
  View,
  Text,
  TextInput,
  Sect,
  useColorScheme,
  TouchableOpacity,
  Image,
  Touchable,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../style';
import {Link} from '@react-navigation/native';
import {LoginHandler} from '../../../modules/auth/LoginHandler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {successLogin} from '../../../redux/actionCreator/login';
import {addUser} from '../../../redux/actionCreator/user';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import ReactNativeModal from 'react-native-modal';

const Login = ({navigation, route}) => {
  const {notif} = route.params;
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.status);
  const Load = useSelector(state => state.loading.status);
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState(false);

  // cek user login
  useEffect(() => {
    if (login === true) {
      navigation.navigate('Home');
    }
    if (notif !== null) {
      setVisible(true);
    }
  }, []);
  const LoginUserHandler = async () => {
    try {
      dispatch(isLoading());
      const result = await LoginHandler(Email, Pass);
      const authData = {
        tokenkey: result.data.data.token,
        refreshkey: result.data.data.refreshToken,
      };
      dispatch(successLogin(authData));
      dispatch(addUser(result.data.data.datauser));
      console.log(result);

      navigation.navigate('Home', {
        screen: 'Home',
        params: {notif: 'Login Success'},
      });

      dispatch(doneLoading());
    } catch (error) {
      setVisible(false);
      dispatch(doneLoading());
      console.log(error);
      console.log(error.response.data.message);
      setErrors(true);
      setMsg(error.response.data.message);
    }
  };
  return (
    <View>
      {Load === true ? <Loading /> : ''}
      <ReactNativeModal isVisible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '10%',
            alignItems: 'center',
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <Ionicons
            name="checkmark-done-outline"
            size={50}
            color={'green'}></Ionicons>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontWeight: '900',
              paddingVertical: 10,
            }}>
            {notif}
          </Text>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{marginTop: 20}}>
            <Ionicons name="close-outline" size={25} color={'red'}></Ionicons>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={errors}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '10%',
            alignItems: 'center',
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <Ionicons name="alert-outline" size={50} color={'red'}></Ionicons>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: '400',
              paddingVertical: 10,
            }}>
            {msg}
          </Text>
          <TouchableOpacity
            onPress={() => setErrors(false)}
            style={{marginTop: 20}}>
            <Ionicons name="close-outline" size={25} color={'red'}></Ionicons>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ImageBackground
        source={loginBg}
        style={styles.containerMain}
        resizeMode="cover">
        <Text style={styles.textHeader}>Login</Text>
        <View>
          <View style={styles.sectionForm}>
            <TextInput
              onChangeText={Email => setEmail(Email)}
              value={Email}
              placeholder="Enter your email adress"
              placeholderTextColor={'white'}
              style={styles.inputForm}></TextInput>
          </View>
          <View style={styles.sectionForm}>
            <View style={styles.inputPass}>
              <TextInput
                onChangeText={Pass => setPass(Pass)}
                value={Pass}
                secureTextEntry={isShow === false ? true : false}
                placeholderTextColor={'white'}
                placeholder="Enter your password"
                style={styles.inputFormPass}></TextInput>
              <TouchableOpacity
                onPress={() =>
                  isShow === true ? setIsShow(false) : setIsShow(true)
                }>
                <Image
                  style={styles.iconPass}
                  source={isShow === false ? iconShow : iconHide}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Link to={{screen: 'Forgotpass'}} style={styles.textForm}>
            Forgot password?
          </Link>
          <View style={styles.sectionForm}>
            <TouchableOpacity
              onPress={() => LoginUserHandler()}
              style={styles.btnLogin}>
              <Text style={styles.textBtnLogin}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionLogin}>
            <View style={styles.borderFlex}></View>
            <Text style={styles.textForm}>or login in with</Text>
            <View style={styles.borderFlex}></View>
          </View>
          <View style={styles.sectionForm}>
            <TouchableOpacity style={styles.btnGoogle}>
              <Image style={styles.iconPass} source={google} />
              <Text style={styles.textBtnGoogle}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
