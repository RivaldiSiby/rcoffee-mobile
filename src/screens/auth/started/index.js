// img
import startedBg from '../../../assets/img/auth/startedBg.png';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';

const Started = ({navigation}) => {
  //   const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <ImageBackground
        source={startedBg}
        style={styles.containerMain}
        resizeMode="cover">
        <View style={styles.backgroundLayer}>
          <View>
            <Text style={styles.textHeaderLanding}>Welcome!</Text>
            <Text style={styles.textLanding}>
              Get a cup of coffee for free every sunday morning
            </Text>
          </View>
          <View>
            <View style={styles.sectionForm}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={styles.btnRegis}>
                <Text style={styles.textBtnRegis}>Create New Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.btnLogin}>
                <Text style={styles.textBtnLogin}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Started;
