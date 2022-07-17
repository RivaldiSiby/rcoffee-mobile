import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.bgLoad}>
      <Image
        style={styles.imgLoad}
        source={require('../../assets/img/loading.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgLoad: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    justifyContent:"center",
    alignItems:"center"
  },
  imgLoad: {
    width: '70%',
    height: 50,
  },
});

export default Loading;
