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

const Activation = ({navigation}) => {
  //   const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState(false);

  const activationEmail = async () => {
    try {
      dispatch(isLoading());
      // data
      if (code === '') {
        setErrors(true);
        setMsg('code required');
        dispatch(doneLoading());
        return;
      }
      const payload = {
        email: user.email,
        code: code,
      };
      console.log(payload);
      await activationHandler(payload);
      let userData = user;
      userData.status = 'active';
      dispatch(addUser(userData));
      navigation.replace('Home', {
        screen: 'Home',
        params: {notif: 'Login Success'},
      });

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
            <Text style={styles.textHeaderForgot}>Account Activation</Text>
            <Text style={styles.textForgot}>
              Please Check email for verification, Enter code code verification
              here
            </Text>
            <Image style={{marginHorizontal: '10%'}} source={forgot} />
          </View>
          <View>
            <View style={styles.sectionForm}>
              <TextInput
                onChangeText={num => setCode(num)}
                keyboardType="numeric"
                placeholderTextColor={'#9F9F9F'}
                placeholder="Enter your code"
                style={styles.inputCode}></TextInput>

              <TouchableOpacity
                onPress={() => activationEmail()}
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

export default Activation;
