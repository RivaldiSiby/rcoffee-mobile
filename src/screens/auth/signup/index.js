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
import React, {useState, useEffect} from 'react';
import styles from '../style';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import {signupHandler} from '../../../modules/auth/signupHandler';
import ReactNativeModal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Signup = ({navigation}) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.status);
  const Load = useSelector(state => state.loading.status);
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [Phone, setPhone] = useState('');
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState(false);

  // cek user login
  useEffect(() => {
    if (login === true) {
      navigation.navigate('Home');
    }
  }, []);
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
      navigation.navigate('Login', {notif: 'Signup Success'});
    } catch (error) {
      dispatch(doneLoading());
      console.log(error);
      setErrors(true);
      setMsg(error.response.data.message);
    }
  };
  // regis
  return (
    <View>
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
        source={signupBg}
        style={styles.containerMain}
        resizeMode="cover">
        <View style={styles.backgroundLayerAuth}>
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
            <View style={styles.sectionForm}>
              <TextInput
                placeholderTextColor={'white'}
                value={Phone}
                keyboardType="numeric"
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;
