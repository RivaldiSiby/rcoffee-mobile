import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';

const Network404 = ({navigation}) => {
  return (
    <>
      <View>
        <ScrollView style={styles.containerMain}>
          <View style={{width: '100%', alignItems: 'center', marginTop: 120}}>
            <Ionicons
              name="globe-outline"
              size={150}
              color="rgba(199, 199, 199, 1)"
            />
          </View>
          <Text style={styles.boldText}>Network Error</Text>
          <Text style={styles.textPara}>
            Hit the orange button down below to Reload
          </Text>

          <TouchableOpacity
            onPress={() => navigation.reset('Splash')}
            style={styles.btnRegis}>
            <Text style={styles.textBtnRegis}>Reload</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default Network404;
