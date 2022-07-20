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
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [Name, setName] = useState('');
  const [First, setFirst] = useState('');
  const [Last, setLast] = useState('');
  const [Gender, setGender] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Address, setAddress] = useState('');
  const [Birth, setBirth] = useState('');
  const [Pass, setPass] = useState('');
  const [NewPass, setNewPass] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [gender1, setGender1] = useState(false);
  const [gender2, setGender2] = useState(false);
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    console.log(user);
    // const getPromosUser = async () => {
    //   try {
    //     dispatch(isLoading());
    //     const result = await getPromo();
    //     setPromos(result.data.data);
    //     dispatch(doneLoading());
    //   } catch (error) {
    //     console.log(error);
    //     dispatch(doneLoading());
    //     console.log(error.response.data.message);
    //     if (error.request.status !== 400) {
    //       ErrorsHandler(error.request.status);
    //     }
    //   }
    // };
    // getPromosUser();
  }, []);
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <View style={styles.boxHeader}>
              <Image style={styles.imgUser} source={{uri: user.img}} />
              <View style={styles.iconEdit}>
                <Ionicons
                  color={'white'}
                  size={17}
                  name="pencil-outline"></Ionicons>
              </View>
            </View>
            <View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Display Name :</Text>
                <TextInput style={styles.inputForm} />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>First Name :</Text>
                <TextInput style={styles.inputForm} />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Last Name :</Text>
                <TextInput style={styles.inputForm} />
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
                <Text style={styles.textTitle}>Email Adress :</Text>
                <TextInput style={styles.inputForm} />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Phone Number :</Text>
                <TextInput keyboardType="numeric" style={styles.inputForm} />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Date of Birth</Text>
                <TextInput style={styles.inputForm} />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Delivery Adress :</Text>
                <TextInput style={styles.inputForm} />
              </View>
            </View>
            <Text style={styles.textHead}>Edit Password</Text>
            <View
              style={{backgroundColor: 'white', padding: 10, borderRadius: 15}}>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Old Password :</Text>
                <View style={styles.inputPass}>
                  <TextInput
                    onChangeText={Pass => setPass(Pass)}
                    value={Pass}
                    secureTextEntry={isShow === false ? true : false}
                    placeholderTextColor={'#9F9F9F'}
                    placeholder="Enter your password"
                    style={styles.inputFormPass}></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      isShow === true ? setIsShow(false) : setIsShow(true)
                    }>
                    {isShow === false ? (
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
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>New Password :</Text>
                <View style={styles.inputPass}>
                  <TextInput
                    onChangeText={Pass => setPass(Pass)}
                    value={Pass}
                    secureTextEntry={isShow === false ? true : false}
                    placeholderTextColor={'#9F9F9F'}
                    placeholder="Enter your password"
                    style={styles.inputFormPass}></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      isShow === true ? setIsShow(false) : setIsShow(true)
                    }>
                    {isShow === false ? (
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
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Confirm New Password :</Text>
                <View style={styles.inputPass}>
                  <TextInput
                    onChangeText={Pass => setPass(Pass)}
                    value={Pass}
                    secureTextEntry={isShow === false ? true : false}
                    placeholderTextColor={'#9F9F9F'}
                    placeholder="Enter your password"
                    style={styles.inputFormPass}></TextInput>
                  <TouchableOpacity
                    onPress={() =>
                      isShow === true ? setIsShow(false) : setIsShow(true)
                    }>
                    {isShow === false ? (
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
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
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
