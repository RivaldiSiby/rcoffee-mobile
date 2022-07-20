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
import {getPromo} from '../../../modules/promos/getPromo';

const Delivery = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {coupon, subtotal} = route.params;
  const login = useSelector(state => state.login);
  const user = useSelector(state => state.user.user);
  const [delivery1, setDelivery1] = useState(false);
  const [delivery2, setDelivery2] = useState(false);
  const [delivery3, setDelivery3] = useState(true);
  const Load = useSelector(state => state.loading.status);

  useEffect(() => {
    console.log(coupon);
  }, []);
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <Text style={styles.headerText}>Delivery</Text>
            <Text style={styles.titleText}>Address details</Text>
            <View style={styles.boxSection}>
              <Text style={styles.headText}>Indonesia</Text>
              <Text style={styles.Text}>{user.address}</Text>
              <Text style={styles.Text}>{user.phone}</Text>
            </View>

            <Text style={styles.titleText}>Delivery methods</Text>
            <View style={styles.boxSection}>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setDelivery1(true);
                    setDelivery2(false);
                    setDelivery3(false);
                  }}>
                  {delivery1 === true ? (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>

                <Text style={styles.listText}>Door delivery</Text>
              </View>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setDelivery2(true);
                    setDelivery1(false);
                    setDelivery3(false);
                  }}>
                  {delivery2 === true ? (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>
                <Text style={styles.listText}>Pick up at store</Text>
              </View>
              <View style={styles.listBox}>
                <Pressable
                  onPress={() => {
                    setDelivery3(true);
                    setDelivery2(false);
                    setDelivery1(false);
                  }}>
                  {delivery3 === true ? (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-on-outline"
                      size={15}
                      color={'#6A4029'}></Ionicons>
                  ) : (
                    <Ionicons
                      style={{paddingBottom: 19}}
                      name="radio-button-off-outline"
                      size={15}
                      color={'#9F9F9F'}></Ionicons>
                  )}
                </Pressable>
                <Text style={styles.listText}>Dine in</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '10%',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.priceText}>IDR {subtotal}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Payment', {
                  transaction: {
                    subtotal: subtotal,
                    coupon: coupon,
                    delivery: delivery1 === true ? 10000 : 0,
                    tax: delivery3 === true ? 0.1 : 0,
                  },
                })
              }
              style={styles.btnRegis}>
              <Text style={styles.textBtnRegis}>Proceed to payment</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Delivery;
