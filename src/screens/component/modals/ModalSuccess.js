import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';

const ModalSuccess = ({msg, cb}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: '10%',
          alignItems: 'center',
          paddingVertical: 20,
          borderRadius: 20,
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 150,
            borderWidth: 4,
            borderColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="checkmark-outline"
            size={50}
            color={'green'}></Ionicons>
        </View>
        <Text
          style={{
            color: 'green',
            opacity: 0.5,
            fontSize: 25,
            fontWeight: '700',
            paddingHorizontal: '10%',
            textAlign: 'center',
            lineHeight: 20,
            paddingTop: 10,
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
          }}>
          Success
        </Text>
        <Text
          style={{
            color: 'black',
            opacity: 0.7,
            fontSize: 15,
            fontWeight: '700',
            paddingHorizontal: '15%',
            textAlign: 'center',
            lineHeight: 20,
            paddingVertical: 10,
            fontFamily: 'Poppins-Regular',
          }}>
          {msg}
        </Text>
        <TouchableOpacity onPress={() => cb(false)} style={{marginTop: 10}}>
          <Ionicons name="close-outline" size={25} color={'red'}></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalSuccess;
