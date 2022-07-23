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
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {successLogin} from '../../../redux/actionCreator/login';
import {addUser} from '../../../redux/actionCreator/user';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import ReactNativeModal from 'react-native-modal';
import ModalSuccess from '../../component/modals/ModalSuccess';
import ModalFail from '../../component/modals/ModalFail';
import {
  sendLocalNotification,
  sendScheduleNotification,
} from '../../../helper/notifications';

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
      navigation.replace('Home');
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
      if (result.data.data.datauser.status === 'inactive') {
        navigation.replace('Activation');
      } else {
        sendLocalNotification(
          'Hi, welcome customer',
          `don't forget to drink coffee and eat something`,
        );
        navigation.replace('Home', {
          screen: 'Home',
          params: {notif: 'Login Success'},
        });
      }

      dispatch(doneLoading());
    } catch (error) {
      setVisible(false);
      dispatch(doneLoading());
      console.log(error);
      setErrors(true);
      setMsg(error.response.data.message);
    }
  };
  return (
    <View>
      {Load === true ? <Loading /> : ''}
      <ReactNativeModal
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        isVisible={visible}>
        <ModalSuccess msg={notif} cb={setVisible} />
      </ReactNativeModal>

      <ReactNativeModal
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        isVisible={errors}>
        <ModalFail msg={msg} cb={setErrors} />
      </ReactNativeModal>
      <ImageBackground
        source={loginBg}
        style={styles.containerMain}
        resizeMode="cover">
        <View style={styles.backgroundLayerAuth}>
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
                  {isShow === false ? (
                    <Ionicons
                      size={20}
                      color={'white'}
                      name="eye-outline"></Ionicons>
                  ) : (
                    <Ionicons
                      size={20}
                      color={'white'}
                      name="eye-off-outline"></Ionicons>
                  )}
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
