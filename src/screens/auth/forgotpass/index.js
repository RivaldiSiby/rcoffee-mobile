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

const Forgotpass = ({navigation}) => {
  //   const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <ScrollView>
        <View style={styles.backgroundWhite}>
          <View style={{paddingHorizontal: '15%'}}>
            <Text style={styles.textHeaderForgot}>Don’t Worry!</Text>
            <Text style={styles.textForgot}>
              Enter your email adress to get reset password link
            </Text>
            <Image source={forgot} />
          </View>
          <View>
            <View style={styles.sectionForm}>
              <TextInput
                placeholder="Enter your email adress"
                style={styles.inputForm}></TextInput>
              <Text style={styles.textForgot}>Haven’t received any link?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={styles.btnRegis}>
                <Text style={styles.textBtnRegis}>Resend Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Forgotpass;
