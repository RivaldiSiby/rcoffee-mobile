import {TouchableOpacity, View, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';

const ModalImg = ({
  icon,
  msg,
  cb,
  opencam,
  openstorage,
  img = false,
  save,
  file,
}) => {
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
        <View>
          {img === false ? (
            <Ionicons name={icon} color={'#9F9F9F'} size={150}></Ionicons>
          ) : (
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 300,
              }}
              source={{uri: img.view}}
            />
          )}
        </View>
        <>
          <TouchableOpacity
            onPress={() => opencam()}
            style={{
              width: '62%',
              backgroundColor: '#6A4029',
              borderRadius: 20,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <Ionicons
              name="camera-outline"
              size={25}
              color={'white'}></Ionicons>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 15,
                lineHeight: 26,
                marginLeft: 10,
              }}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openstorage()}
            style={{
              width: '62%',
              backgroundColor: '#6A4029',
              borderRadius: 20,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              marginVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 10,
            }}>
            <Ionicons name="image-outline" size={25} color={'white'}></Ionicons>
            <Text
              style={{
                width: '62%',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 15,
                lineHeight: 26,
                marginLeft: 10,
              }}>
              Upload
            </Text>
          </TouchableOpacity>
        </>
        <>
          {img === false ? (
            <TouchableOpacity
              onPress={() => {
                cb(false);
              }}
              style={{
                width: '62%',
                backgroundColor: 'red',
                borderRadius: 20,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginVertical: 10,
                flexDirection: 'row',
                opacity: 0.7,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 15,
                  lineHeight: 26,
                  marginLeft: 10,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                cb(false);
                save(img === false ? null : img.view);
                file(img === false ? null : img.path);
              }}
              style={{
                width: '62%',
                backgroundColor: '#FFBA33',
                borderRadius: 20,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                marginVertical: 10,
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}>
              <Ionicons
                name="save-outline"
                size={25}
                color={'black'}></Ionicons>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Regular',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: 15,
                  lineHeight: 26,
                  marginLeft: 10,
                }}>
                Save Img
              </Text>
            </TouchableOpacity>
          )}
        </>
      </View>
    </View>
  );
};

export default ModalImg;
