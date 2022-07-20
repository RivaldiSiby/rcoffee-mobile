import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import {getPromo} from '../../../modules/promos/getPromo';

const Coupon = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);

  const Load = useSelector(state => state.loading.status);
  const [promos, setPromos] = useState([]);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    const getPromosUser = async () => {
      try {
        dispatch(isLoading());
        const result = await getPromo();
        setPromos(result.data.data);
        dispatch(doneLoading());
      } catch (error) {
        console.log(error);
        dispatch(doneLoading());
        console.log(error.response.data.message);
        if (error.request.status !== 400) {
          ErrorsHandler(error.request.status);
        }
      }
    };
    getPromosUser();
  }, []);
  return (
    <>
      {(Load === true) | (promos.length === 0) ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <Text style={styles.textCoupon}>
              Coupons will be updated every weeks. Check them out!{' '}
            </Text>
            <View>
              <ScrollView
                horizontal
                vertical={false}
                style={{
                  marginHorizontal: '10%',
                  marginTop: 36,
                  minHeight: 30,
                }}>
                {promos.map(item => (
                  <TouchableOpacity
                    onPress={() => setCoupon(item.coupon)}
                    style={
                      coupon === item.coupon ? styles.promoActive : styles.promo
                    }>
                    <Image style={styles.imgBox} source={{uri: item.img}} />
                    <Text style={styles.textBox}>{item.name}</Text>
                    <Text style={styles.textBox}>
                      {parseFloat(item.discount) * 100}% OFF
                    </Text>
                    <Text style={styles.textDesc}>{item.description}</Text>
                    <View style={styles.infoPromo}>
                      <Text style={styles.textHeading}>COUPON CODE</Text>
                      <Text style={styles.codeText}>{item.coupon}</Text>
                      <Text style={styles.textDesc}>
                        Valid untill October 10th 2020
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart', {coupon: coupon})}
              style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Apply Coupon</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Coupon;
