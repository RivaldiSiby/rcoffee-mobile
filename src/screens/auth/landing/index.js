// img
import landingBg from '../../../assets/img/auth/landingBg.png';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import styles from '../style';

const Landing = ({navigation}) => {
  //   const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <ImageBackground
        source={landingBg}
        style={styles.containerMain}
        resizeMode="cover">
        <View style={styles.backgroundLayer}>
          <Text style={styles.textHeaderLanding}>Coffee for Everyone</Text>
          <View>
            <View style={styles.sectionForm}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Started')}
                style={styles.btnLogin}>
                <Text style={styles.textBtnLogin}>Get started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Landing;
