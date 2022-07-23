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
import {forgotHandler} from '../../../modules/auth/forgotHandler';

const Forgotpass = ({navigation}) => {
  const dispatch = useDispatch();
  // const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(false);
  const [msg, setMsg] = useState(false);

  const forgotHandlerUser = async () => {
    try {
      dispatch(isLoading());
      // data
      if (email === '') {
        setErrors(true);
        setMsg('email required');
        dispatch(doneLoading());
        return;
      }
      const payload = {
        email: email,
      };
      await forgotHandler(payload);
      navigation.replace('Codepass', {email: email});

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
          <View style={{paddingHorizontal: '15%'}}>
            <Text style={styles.textHeaderForgot}>Don’t Worry!</Text>
            <Text style={styles.textForgot}>
              Enter your email adress to get code for reset password
            </Text>
            <Image source={forgot} />
          </View>
          <View>
            <View style={styles.sectionForm}>
              <TextInput
                placeholderTextColor={'#9F9F9F'}
                onChangeText={text => setEmail(text)}
                placeholder="Enter your email adress"
                style={styles.inputForm2}></TextInput>
              <TouchableOpacity
                onPress={() => forgotHandlerUser()}
                style={styles.btnRegis}>
                <Text style={styles.textBtnRegis}>Send Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Forgotpass;
