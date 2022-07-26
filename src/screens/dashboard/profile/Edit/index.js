import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalImg from '../../../component/modals/ModalImg';
import ReactNativeModal from 'react-native-modal';
import Password from '../../../component/profile/Password';
import DatePicker from 'react-native-date-picker';
import {doneLoading, isLoading} from '../../../../redux/actionCreator/loading';
import {updateProfile} from '../../../../modules/user/updateProfile';
import {getUser} from '../../../../modules/user/getUser';
import {GenerateToken} from '../../../../modules/auth/checkAuth';
import {addUser} from '../../../../redux/actionCreator/user';
import {successLogin} from '../../../../redux/actionCreator/login';
import {updatePass} from '../../../../modules/user/updatePass';
import ModalFail from '../../../component/modals/ModalFail';

const EditProfile = ({navigation, route}) => {
  const {edit} = route.params;

  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const dispatch = useDispatch();
  const [Name, setName] = useState(user.name === null ? null : user.name);
  const [First, setFirst] = useState(
    user.first_name === null ? null : user.first_name,
  );
  const [Last, setLast] = useState(
    user.last_name === null ? null : user.last_name,
  );
  const [date, setDate] = useState(
    user.date_birth === null ? null : new Date(user.date_birth),
  );
  const [Gender, setGender] = useState(
    user.gender === null ? null : user.gender,
  );
  const [Email, setEmail] = useState(user.email);
  const [Phone, setPhone] = useState(user.phone);
  const [Address, setAddress] = useState(
    user.address === null ? null : user.address,
  );
  // const [Birth, setBirth] = useState('');
  const [Pass, setPass] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [gender1, setGender1] = useState(
    (user.gender === null) | (user.gender === 'female') ? false : true,
  );
  const [gender2, setGender2] = useState(
    (user.gender === null) | (user.gender === 'male') ? false : true,
  );
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [view, setView] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Msg, setMsg] = useState(false);

  const openCam = async () => {
    try {
      const camera = await launchCamera({
        saveToPhotos: true,
        maxWidth: 720,
        maxHeight: 720,
      });
      setView({
        view: camera.assets[0].uri,
        path: camera,
      });
    } catch (error) {}
  };
  const openStorage = async () => {
    try {
      const storage = await launchImageLibrary();
      setView({
        view: storage.assets[0].uri,
        path: storage,
      });
    } catch (error) {}
  };

  // update profile
  const updateProfileUser = async () => {
    try {
      dispatch(isLoading());
      // set data
      let formData = new FormData();
      let imgData;
      if (file !== null) {
        imgData = {
          uri: file.assets[0].uri,
          size: file.assets[0].fileSize,
          name: file.assets[0].fileName,
          type: file.assets[0].type,
        };
      }

      file !== null ? formData.append('photo', imgData) : setFile(null);
      Email !== null ? formData.append('email', Email) : setEmail(null);
      Address !== null ? formData.append('address', Address) : setAddress(null);
      Name !== null ? formData.append('name', Name) : setName(null);
      First !== null ? formData.append('first_name', First) : setFirst(null);
      Last !== null ? formData.append('last_name', Last) : setLast(null);
      Phone !== null ? formData.append('phone', Phone) : setPhone(null);
      date !== null
        ? formData.append('date_birth', date.toDateString())
        : setDate(null);
      Gender !== null ? formData.append('gender', Gender) : setGender(null);

      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // update data
      await updateProfile(token, formData);

      //  get data
      const result = await getUser(token);
      // update redux data
      dispatch(addUser(result.data.data));
      dispatch(doneLoading());
      navigation.navigate('Profile', {msg: 'Profile is Updated'});
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      setIsError(true);
      setMsg(error.response.data.message);
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.replace('Login', {notif: 'authentication has expired'});
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };
  // update password
  const updatePasswordUser = async () => {
    try {
      dispatch(isLoading());
      // cek pass
      if (NewPass.length < 8) {
        setMsg('Password Length Min Must 8 ');
        setIsError(true);
        dispatch(doneLoading());
        return;
      }

      if (NewPass !== ConfirmPass) {
        setMsg('Confirm password does not match');
        setIsError(true);
        dispatch(doneLoading());
        return;
      }
      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // update data
      const data = {
        password: Pass,
        newPassword: NewPass,
      };
      console.log(data);
      await updatePass(token, data);
      dispatch(doneLoading());
      navigation.navigate('Profile', {msg: 'Password is Updated'});
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setIsError(true);
      setMsg(error.response.data.message);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.replace('Login', {notif: 'authentication has expired'});
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={visible}>
            <ModalImg
              icon={'person-circle-outline'}
              msg={''}
              cb={setVisible}
              opencam={openCam}
              openstorage={openStorage}
              img={view}
              save={setImg}
              file={setFile}
            />
          </ReactNativeModal>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={isError}>
            <ModalFail msg={Msg} cb={setIsError} />
          </ReactNativeModal>
          <ScrollView style={styles.containerMain}>
            {edit === 'profile' ? (
              <>
                <View style={styles.boxHeader}>
                  {user.img === null && img === null ? (
                    <>
                      <Ionicons
                        name="person-circle-outline"
                        color={'#9F9F9F'}
                        size={130}></Ionicons>
                    </>
                  ) : (
                    <Image
                      style={styles.imgUser}
                      source={{uri: img === null ? user.img : img}}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={styles.iconEdit}>
                    <Ionicons
                      color={'white'}
                      size={17}
                      name="pencil-outline"></Ionicons>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Display Name :</Text>
                    <TextInput
                      value={Name}
                      onChangeText={text => setName(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your Display Name"
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>First Name :</Text>
                    <TextInput
                      value={First}
                      onChangeText={text => setFirst(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your First Name"
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Last Name :</Text>
                    <TextInput
                      value={Last}
                      onChangeText={text => setLast(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your Last Name"
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.checkInput}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 30,
                      }}>
                      <Pressable
                        onPress={() => {
                          setGender('male');
                          setGender1(true);
                          setGender2(false);
                        }}>
                        {gender1 === true ? (
                          <Ionicons
                            name="radio-button-on-outline"
                            size={15}
                            color={'#6A4029'}></Ionicons>
                        ) : (
                          <Ionicons
                            name="radio-button-off-outline"
                            size={15}
                            color={'#9F9F9F'}></Ionicons>
                        )}
                      </Pressable>
                      <Text style={styles.textForm}>Male</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 30,
                      }}>
                      <Pressable
                        onPress={() => {
                          setGender('female');
                          setGender1(false);
                          setGender2(true);
                        }}>
                        {gender2 === true ? (
                          <Ionicons
                            name="radio-button-on-outline"
                            size={15}
                            color={'#6A4029'}></Ionicons>
                        ) : (
                          <Ionicons
                            name="radio-button-off-outline"
                            size={15}
                            color={'#9F9F9F'}></Ionicons>
                        )}
                      </Pressable>
                      <Text style={styles.textForm}>Female</Text>
                    </View>
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Email Address :</Text>
                    <TextInput
                      value={Email}
                      onChangeText={text => setEmail(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your Email Address"
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Phone Number :</Text>
                    <TextInput
                      keyboardType="numeric"
                      value={Phone}
                      onChangeText={text => setPhone(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your Phone Number"
                      style={styles.inputForm}
                    />
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Date of Birth</Text>
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      style={styles.inputDate}>
                      <Text
                        style={
                          date === null
                            ? styles.inputPlaceDate
                            : styles.inputFormDate
                        }>
                        {date === null
                          ? 'Enter your Phone Number Date of Birth'
                          : date.toISOString().split('T')[0]}
                      </Text>
                      <TouchableOpacity onPress={() => setOpen(true)}>
                        <Ionicons
                          name="calendar-outline"
                          size={24}
                          color={'#9F9F9F'}></Ionicons>
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <DatePicker
                      modal
                      open={open}
                      date={date === null ? new Date() : new Date(date)}
                      placeholder="select date"
                      mode="date"
                      onConfirm={date => {
                        setDate(date);
                        setOpen(false);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </View>
                  <View style={styles.boxForm}>
                    <Text style={styles.textTitle}>Delivery Adress :</Text>
                    <TextInput
                      value={Address}
                      onChangeText={text => setAddress(text)}
                      placeholderTextColor={'#9F9F9F'}
                      placeholder="Enter your Address"
                      style={styles.inputForm}
                    />
                  </View>
                </View>
              </>
            ) : (
              <>
                <Password
                  styles={styles}
                  Pass={Pass}
                  setPass={setPass}
                  NewPass={NewPass}
                  setNewPass={setNewPass}
                  ConfirmPass={ConfirmPass}
                  setConfirmPass={setConfirmPass}
                  isShow1={isShow1}
                  isShow2={isShow2}
                  isShow3={isShow3}
                  setIsShow1={setIsShow1}
                  setIsShow2={setIsShow2}
                  setIsShow3={setIsShow3}
                />
              </>
            )}
            <TouchableOpacity
              onPress={() =>
                edit === 'profile' ? updateProfileUser() : updatePasswordUser()
              }
              style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Save and Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default EditProfile;
