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
import Loading from '../../loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import {getHistory} from '../../../modules/transaction/getHistory';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import {successLogin} from '../../../redux/actionCreator/login';

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState(0);
  useEffect(() => {
    const getHistoryUser = async () => {
      try {
        dispatch(isLoading());
        // cek token
        const token = await GenerateToken(login);
        let newToken = login;
        newToken['tokenkey'] = token;
        dispatch(successLogin(newToken));
        const result = await getHistory(12, token);
        setHistory(result.data.data);
        setData(result.data.meta.totalData);

        dispatch(doneLoading());
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

    getHistoryUser();
  }, []);
  const showMoreHandler = async () => {
    try {
      dispatch(isLoading());
      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // get plus
      const totalData = history.length + 12;
      const result = await getHistory(totalData, token);
      setHistory(result.data.data);
      setData(result.data.meta.totalData);
      console.log(result.data.meta.totalData);
      console.log(result.data.data.length);
      dispatch(doneLoading());
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
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ScrollView style={styles.containerMain}>
            <Text style={styles.textTitle}>Order History</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="hand-left-outline"
                color={'black'}
                size={20}></Ionicons>
              <Text style={styles.textTriger}>swipe on an item to delete</Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                // height: '100%',
                paddingBottom: 50,
              }}>
              <View>
                {/* <ScrollView horizontal vertical={false}> */}
                {history.map(item => (
                  <View style={styles.boxItem}>
                    <Ionicons
                      // style={{marginHorizontal: '10%'}}
                      name="receipt-outline"
                      color={'black'}
                      size={69}></Ionicons>
                    <View style={styles.boxInfo}>
                      <Text style={styles.textBold}>{item.payment_method}</Text>
                      <Text style={styles.textPrice}>IDR {item.total}</Text>
                      <Text style={styles.textDate}>
                        {item.created_at.split('T')[0]}
                      </Text>
                    </View>
                  </View>
                ))}

                {/* </ScrollView> */}
              </View>
              {(data <= 12) | (history.length >= data) ? (
                ''
              ) : (
                <TouchableOpacity
                  onPress={() => showMoreHandler()}
                  style={{alignItems: 'center', marginBottom: 50}}>
                  <Text style={styles.textTriger}>Show more</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default History;
