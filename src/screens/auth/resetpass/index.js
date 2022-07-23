// img
import forgot from '../../../assets/img/auth/forgot.png';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';
import {useDispatch, useSelector} from 'react-redux';
import {activationHandler} from '../../../modules/auth/activationHandler';
import {addUser} from '../../../redux/actionCreator/user';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import ReactNativeModal from 'react-native-modal';
import ModalFail from '../../component/modals/ModalFail';
import Loading from '../../component/loading';
import {resetPassword} from '../../../modules/auth/resetPassword';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Resetpass = ({navigation, route}) => {
  const {code, email} = route.params;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  // handler
  const resetHandler = async () => {
    try {
      dispatch(isLoading());
      // pass cek
      if (pass === '' || confirmpass === '') {
        setErrors(true);
        setMsg('password and confirm password must be required');
        dispatch(doneLoading());
        return;
      }
      if (pass.length < 8) {
        setErrors(true);
        setMsg(`Password must be longer than 8 characters`);
        dispatch(doneLoading());
        return;
      }
      if (pass !== confirmpass) {
        setErrors(true);
        setMsg(`Confirm password doesn't match`);
        dispatch(doneLoading());
        return;
      }
      const payload = {
        email: email,
        code: code,
        password: pass,
      };
      await resetPassword(payload);
      navigation.replace('Login', {notif: 'Password has changed'});

      dispatch(doneLoading());
    } catch (error) {
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
        isVisible={errors}>
        <ModalFail msg={msg} cb={setErrors} />
      </ReactNativeModal>
      <ScrollView>
        <View style={styles.backgroundWhite}>
          <View style={{paddingHorizontal: '5%', alignItems: 'center'}}>
            <Text style={styles.textHeaderForgot}>Reset Password</Text>
            <Image style={{marginHorizontal: '10%'}} source={forgot} />
          </View>
          <View>
            <View style={styles.sectionForm}>
              <View style={{marginVertical: 15}}>
                <View style={styles.inputPassReset}>
                  <TextInput
                    onChangeText={Pass => setPass(Pass)}
                    value={pass}
                    secureTextEntry={isShow1 === false ? true : false}
                    placeholderTextColor={'#9F9F9F'}
                    placeholder="Enter your New password"
                    style={styles.inputFormPassReset}></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      isShow1 === true ? setIsShow1(false) : setIsShow1(true)
                    }>
                    {isShow1 === false ? (
                      <Ionicons
                        size={20}
                        color={'#9F9F9F'}
                        name="eye-outline"></Ionicons>
                    ) : (
                      <Ionicons
                        size={20}
                        color={'#9F9F9F'}
                        name="eye-off-outline"></Ionicons>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginVertical: 15, marginBottom: 30}}>
                <View style={styles.inputPassReset}>
                  <TextInput
                    onChangeText={Pass => setConfirmpass(Pass)}
                    value={confirmpass}
                    secureTextEntry={isShow2 === false ? true : false}
                    placeholderTextColor={'#9F9F9F'}
                    placeholder="Confirm your New password"
                    style={styles.inputFormPassReset}></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      isShow2 === true ? setIsShow2(false) : setIsShow2(true)
                    }>
                    {isShow2 === false ? (
                      <Ionicons
                        size={20}
                        color={'#9F9F9F'}
                        name="eye-outline"></Ionicons>
                    ) : (
                      <Ionicons
                        size={20}
                        color={'#9F9F9F'}
                        name="eye-off-outline"></Ionicons>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => resetHandler()}
                style={styles.btnRegis}>
                <Text style={styles.textBtnRegis}>Confirm Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Resetpass;
