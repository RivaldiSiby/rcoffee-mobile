import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';

const ModalConfirm = ({msg, cb, handler}) => {
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
            borderColor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="alert-outline" size={50} color={'orange'}></Ionicons>
        </View>
        <Text
          style={{
            color: 'black',
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
          Are You sure ?
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <TouchableOpacity
            onPress={() => {
              handler();
              cb();
            }}
            style={{
              backgroundColor: 'green',
              padding: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              shadowOffset: 5,
              shadowColor: 'black',
              shadowOpacity: 0.5,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Bold',
                shadowOffset: 1,
                shadowColor: 'black',
                shadowOpacity: 0.5,
              }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cb()}
            style={{
              backgroundColor: 'red',
              padding: 10,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 10,
              shadowOffset: 5,
              shadowColor: 'black',
              shadowOpacity: 0.5,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Bold',
                shadowOffset: 1,
                shadowColor: 'black',
                shadowOpacity: 0.5,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalConfirm;
