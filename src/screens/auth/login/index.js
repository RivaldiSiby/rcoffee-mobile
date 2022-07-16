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

const Login = () => {
  //   const isDarkMode = useColorScheme() === 'dark';
  const [isShow, setIsShow] = useState(false);
  return (
    <View>
      <ImageBackground
        source={loginBg}
        style={styles.containerMain}
        resizeMode="cover">
        <Text style={styles.textHeader}>Login</Text>
        <View>
          <View style={styles.sectionForm}>
            <TextInput
              placeholder="Enter your email adress"
              style={styles.inputForm}></TextInput>
          </View>
          <View style={styles.sectionForm}>
            <View style={styles.inputPass}>
              <TextInput
                secureTextEntry={isShow === false ? true : false}
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
          <Text style={styles.textForm}>Forgot password?</Text>
          <View style={styles.sectionForm}>
            <TouchableOpacity style={styles.btnLogin}>
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
