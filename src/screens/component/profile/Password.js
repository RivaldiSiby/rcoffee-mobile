import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Password = ({
  styles,
  Pass,
  setPass,
  NewPass,
  setNewPass,
  ConfirmPass,
  setConfirmPass,
  isShow1,
  setIsShow1,
  isShow2,
  setIsShow2,
  isShow3,
  setIsShow3,
}) => {
  return (
    <View>
      <Text style={styles.textHead}>Edit Password</Text>
      <View style={{backgroundColor: 'white', padding: 10, borderRadius: 15}}>
        <View style={styles.boxForm}>
          <Text style={styles.textTitle}>Old Password :</Text>
          <View style={styles.inputPass}>
            <TextInput
              onChangeText={Pass => setPass(Pass)}
              value={Pass}
              secureTextEntry={isShow1 === false ? true : false}
              placeholderTextColor={'#9F9F9F'}
              placeholder="Enter your password"
              style={styles.inputFormPass}></TextInput>
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
        <View style={styles.boxForm}>
          <Text style={styles.textTitle}>New Password :</Text>
          <View style={styles.inputPass}>
            <TextInput
              onChangeText={Pass => setNewPass(Pass)}
              value={NewPass}
              secureTextEntry={isShow2 === false ? true : false}
              placeholderTextColor={'#9F9F9F'}
              placeholder="Enter your password"
              style={styles.inputFormPass}></TextInput>
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
        <View style={styles.boxForm}>
          <Text style={styles.textTitle}>Confirm New Password :</Text>
          <View style={styles.inputPass}>
            <TextInput
              onChangeText={Pass => setConfirmPass(Pass)}
              value={ConfirmPass}
              secureTextEntry={isShow3 === false ? true : false}
              placeholderTextColor={'#9F9F9F'}
              placeholder="Enter your password"
              style={styles.inputFormPass}></TextInput>
            <TouchableOpacity
              onPress={() =>
                isShow3 === true ? setIsShow3(false) : setIsShow3(true)
              }>
              {isShow3 === false ? (
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
    </View>
  );
};

export default Password;
