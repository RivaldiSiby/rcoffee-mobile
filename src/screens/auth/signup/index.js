// img
import iconShow from '../../../assets/img/auth/iconShow.jpg';
import iconHide from '../../../assets/img/auth/iconHide.png';
import signupBg from '../../../assets/img/auth/signupBg.png';
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

const Signup = () => {
  //   const isDarkMode = useColorScheme() === 'dark';
  const [isShow, setIsShow] = useState(false);
  return (
    <View>
      <ImageBackground
        source={signupBg}
        style={styles.containerMain}
        resizeMode="cover">
        <Text style={styles.textHeader}>Sign Up</Text>
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
          <View style={styles.sectionForm}>
            <TextInput
              placeholder="Enter your phone number"
              style={styles.inputForm}></TextInput>
          </View>
          <View style={styles.sectionForm}>
            <TouchableOpacity style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionForm}>
            <TouchableOpacity style={styles.btnGoogle}>
              <Image style={styles.iconPass} source={google} />
              <Text style={styles.textBtnGoogle}>
                Create Account with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;
