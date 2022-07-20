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
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import {addChart} from '../../../redux/actionCreator/chart';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import ErrorsHandler from '../../../helper/errorHandler';

const Cart = ({navigation, route}) => {
  const {coupon = null} = route.params;
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const cart = useSelector(state => state.chart.chart);
  const user = useSelector(state => state.user);
  const Load = useSelector(state => state.loading.status);
  const [couponVal, setCouponVal] = useState(coupon);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        console.log(coupon);
        dispatch(isLoading());
        await GenerateToken(login.auth);
        dispatch(doneLoading());
        return;
      } catch (error) {
        console.log(error);
        console.log(error.request.status);
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
    checkLogin();
  }, []);
  useEffect(() => {
    dispatch(isLoading());
    if (cart.length > 0) {
      // jumlahkan sub total
      let subtotal = [];
      cart.map(item => subtotal.push(item.quantity * item.price));

      setSubtotal(subtotal.reduce((total, value) => total + value));

      // atur pajak dan ongkos kirim
      setCouponVal(null);
      dispatch(doneLoading());

      return;
    }
  }, [cart]);
  const plusQuantity = id => {
    let newCart = [];
    cart.map(item => {
      if (item.id === id) {
        item.quantity = parseInt(item.quantity) + 1;
        newCart.push(item);
      } else {
        newCart.push(item);
      }
      if (newCart.length === cart.length) {
        dispatch(addChart(newCart));
      }
    });
  };
  const minQuantity = id => {
    let newCart = [];
    cart.map(item => {
      if (item.id === id) {
        item.quantity = parseInt(item.quantity) - 1;
        newCart.push(item);
      } else {
        newCart.push(item);
      }
      if (newCart.length === cart.length) {
        dispatch(addChart(newCart));
      }
    });
  };

  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            {cart.map(item => (
              <View style={styles.boxCart}>
                <View style={styles.boxLeft}>
                  <Image style={styles.imgBox} source={{uri: item.img}} />
                  <Text style={styles.priceProduct}>IDR {item.price}</Text>
                </View>

                <View style={styles.boxRight}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <View style={styles.buletView}>
                    <TouchableOpacity
                      onPress={() => minQuantity(item.id)}
                      style={parseInt(item.quantity) <= 1 ? {opacity: 0} : ''}>
                      <Text style={styles.bulet}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Pressable onPress={() => plusQuantity(item.id)}>
                      <Text style={styles.bulet}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('Coupon')}
              style={coupon === null ? styles.bulletActive : styles.btnRegis}>
              <Text
                style={
                  coupon === null
                    ? styles.textBulletActive
                    : styles.textBtnRegis
                }>
                {coupon === null ? 'Apply Coupons' : 'Change Coupons'}
              </Text>
              <Ionicons
                style={
                  coupon === null
                    ? {marginLeft: '5%'}
                    : {marginLeft: '5%', color: 'white'}
                }
                name="arrow-forward-outline"
                size={22}
                color="#6A4029"
              />
            </TouchableOpacity>
            <View style={styles.struk}>
              <View style={styles.boxStruk}>
                <Text style={styles.textInfo}>Item Total</Text>
                <Text style={styles.textPrice}>IDR {subtotal}</Text>
              </View>
              <View
                style={{
                  height: 100,
                  marginHorizontal: '5%',
                  marginTop: 54,
                  flexDirection: 'row',
                  height: 50,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.textTotal}>Total :</Text>
                <Text style={styles.textTotal}>IDR {subtotal}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bulletActiveEnd}
              onPress={() =>
                navigation.navigate('Delivery', {
                  coupon: coupon,
                  subtotal: subtotal,
                })
              }>
              <Ionicons
                style={{marginLeft: '15%'}}
                name="chevron-forward-outline"
                size={22}
                color="#6A4029"
              />
              <Text style={styles.textBulletActiveEnd}>CHECKOUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Cart;
