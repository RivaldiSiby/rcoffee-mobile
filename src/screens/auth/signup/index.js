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
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import {signupHandler} from '../../../modules/auth/signupHandler';

const Signup = ({navigation}) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const Load = useSelector(state => state.loading.status);
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [Phone, setPhone] = useState('');

  const regisHandler = async () => {
    try {
      dispatch(isLoading());
      const payload = {
        email: Email,
        password: Pass,
        phone: Phone,
      };
      await signupHandler(payload);
      dispatch(doneLoading());
      navigation.navigate('Login');
    } catch (error) {
      dispatch(doneLoading());
      console.log(error.response.data.message);
    }
  };
  // regis
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
              placeholderTextColor={'white'}
              placeholder="Enter your email adress"
              value={Email}
              onChangeText={Email => setEmail(Email)}
              style={styles.inputForm}></TextInput>
          </View>
          <View style={styles.sectionForm}>
            <View style={styles.inputPass}>
              <TextInput
                placeholderTextColor={'white'}
                secureTextEntry={isShow === false ? true : false}
                placeholder="Enter your password"
                value={Pass}
                onChangeText={Pass => setPass(Pass)}
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
              placeholderTextColor={'white'}
              value={Phone}
              onChangeText={Phone => setPhone(Phone)}
              placeholder="Enter your phone number"
              style={styles.inputForm}></TextInput>
          </View>
          <View style={styles.sectionForm}>
            <TouchableOpacity
              onPress={() => regisHandler()}
              style={styles.btnRegis}>
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
