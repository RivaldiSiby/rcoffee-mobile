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
import React, {useState} from 'react';
import styles from '../style';
import {Link} from '@react-navigation/native';
import {LoginHandler} from '../../../modules/auth/LoginHandler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../loading';
import {successLogin} from '../../../redux/actionCreator/login';
import {addUser} from '../../../redux/actionCreator/user';
import loading from '../../../redux/reducers/loading';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';

const Login = ({navigation}) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const Load = useSelector(state => state.loading.status);
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');

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

      navigation.navigate('Dashboard', {screen: 'Home'});
      dispatch(doneLoading());
    } catch (error) {
      dispatch(doneLoading());
      console.log(error);
      console.log(error.response.data.message);
    }
  };
  return (
    <View>
      {Load === true ? <Loading /> : ''}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Dashboard', {screen: 'Home'})}
              style={styles.btnGoogle}>
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
