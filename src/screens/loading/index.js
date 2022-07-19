import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.bgLoad}>
      <Text style={styles.textTitle}>Rcoffee</Text>
      <Image
        style={styles.imgLoad}
        source={require('../../assets/img/loading.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 30,
  },
  bgLoad: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLoad: {
    width: '70%',
    height: 50,
  },
});

export default Loading;
