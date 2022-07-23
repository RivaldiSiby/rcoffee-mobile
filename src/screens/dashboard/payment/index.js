import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import {getPromo} from '../../../modules/promos/getPromo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {clearChart} from '../../../redux/actionCreator/chart';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import {successLogin} from '../../../redux/actionCreator/login';
import {postPayment} from '../../../modules/payment/postPayment';
import ReactNativeModal from 'react-native-modal';

const Payment = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {transaction} = route.params;
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.chart.chart);
  const [payment1, setPayment1] = useState(true);
  const [payment2, setPayment2] = useState(false);
  const [payment3, setPayment3] = useState(false);
  const [visible, setVisible] = useState(false);
  const Load = useSelector(state => state.loading.status);

  useEffect(() => {
    dispatch(isLoading());
    dispatch(doneLoading());
  }, []);
  // payment
  const confirmPayment = async () => {
    try {
      dispatch(isLoading());
      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // jalankan operasi
      const payment = `${payment1 === true ? 'card' : ''}${
        payment2 === true ? 'bank account' : ''
      }${payment3 === true ? 'cash on delivery' : ''}`;
      let products = [];
      cart.map(item =>
        products.push({stock_id: item.id, quantity: item.quantity}),
      );
      const data = {
        coupon: transaction.coupon,
        products,
        delivery_cost: `${transaction.delivery}`,
        tax: `${transaction.tax}`,
        payment_method: payment,
      };
      await postPayment(token, data);
      setVisible(true);
      // hapus local storage chart
      dispatch(clearChart());
      dispatch(doneLoading());
      navigation.replace('Home', {
        screen: 'Home',
        params: {notif: 'Payment Success'},
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.navigate('Login');
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };
  return (
    <>
      <ReactNativeModal isVisible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: '10%',
            alignItems: 'center',
            paddingVertical: 20,
            borderRadius: 20,
          }}>
          <Ionicons
            name="checkmark-done-outline"
            size={50}
            color={'green'}></Ionicons>
          <Text
            style={{
              color: 'black',
              fontWeight: '900',
              paddingVertical: 10,
            }}>
            Payment Success
          </Text>
        </View>
      </ReactNativeModal>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <Text style={styles.titleText}>Products</Text>
            <View style={styles.boxSection}>
              {cart.map(item => (
                <>
                  <View style={styles.boxList}>
                    <Image style={styles.boxImg} source={{uri: item.img}} />
                    <View style={styles.listInfo}>
                      <Text style={styles.ProductText}>{item.name}</Text>
                      <Text style={styles.ProductText}>x {item.quantity}</Text>
                      <Text style={styles.ProductText}>{item.size}</Text>
                    </View>
                    <View style={styles.listPrice}>
                      <Text style={styles.textPrice}>IDR {item.price}</Text>
                    </View>
                  </View>
                </>
              ))}
            </View>

            <Text style={styles.titleText}>Payment Method</Text>
            <View style={styles.boxSection}>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setPayment1(true);
                    setPayment2(false);
                    setPayment3(false);
                  }}>
                  {payment1 === true ? (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>
                <View style={styles.boxPay}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#F47B0A',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="card-outline"
                      color={'white'}
                      size={24}></Ionicons>
                  </View>
                  <Text style={styles.listText}>Card</Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setPayment2(true);
                    setPayment1(false);
                    setPayment3(false);
                  }}>
                  {payment2 === true ? (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>
                <View style={styles.boxPay}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#6A4029',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="folder-outline"
                      color={'white'}
                      size={24}></Ionicons>
                  </View>
                  <Text style={styles.listText}>Bank account</Text>
                </View>
              </View>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setPayment3(true);
                    setPayment2(false);
                    setPayment1(false);
                  }}>
                  {payment3 === true ? (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 15}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>
                <View style={styles.boxPay}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: '#FFBA33',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="car-outline"
                      color={'black'}
                      size={24}></Ionicons>
                  </View>
                  <Text style={styles.listText}>Cash on delivery</Text>
                </View>
              </View>
            </View>
            {payment1 === true ? (
              <>
                <Text style={styles.titleText}>My Card</Text>
                <View>
                  <ScrollView horizontal vertical={false}>
                    <Image
                      source={require('../../../assets/img/dashboard/card.png')}
                    />
                    <Image
                      source={require('../../../assets/img/dashboard/card.png')}
                    />
                    <Image
                      source={require('../../../assets/img/dashboard/card.png')}
                    />
                  </ScrollView>
                </View>
              </>
            ) : (
              ''
            )}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.totalText}>Subtotal</Text>
              <Text style={styles.totalText}>IDR {transaction.subtotal}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.totalText}>Delivery Cost</Text>
              <Text style={styles.totalText}>IDR {transaction.delivery}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingBottom: 5,
                borderBottomColor: 'rgba(106, 64, 41, 1)',
              }}>
              <Text style={styles.totalText}>Tax</Text>
              <Text style={styles.totalText}>
                IDR {transaction.tax * transaction.subtotal}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.priceText}>Total</Text>
              <Text style={styles.priceText}>
                IDR{' '}
                {transaction.tax * transaction.subtotal +
                  transaction.subtotal +
                  transaction.delivery}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => confirmPayment()}
              style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Proceed to payment</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Payment;
