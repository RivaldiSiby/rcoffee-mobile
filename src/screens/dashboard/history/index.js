import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Awesome5 from 'react-native-vector-icons/FontAwesome5';
import {getHistory} from '../../../modules/transaction/getHistory';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import {successLogin} from '../../../redux/actionCreator/login';
import ModalConfirm from '../../component/modals/ModalConfirm';
import {deleteTransaction} from '../../../modules/transaction/deleteTransaction';
import {doneTransaction} from '../../../modules/transaction/doneTransaction';

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState(0);
  const [limit, setLimit] = useState(6);
  const [visible, setVisible] = useState(false);
  const [handler, setHandler] = useState(
    user.role === 'admin' ? 'done' : 'delete',
  );
  const [id, setId] = useState([]);
  const [msg, setMsg] = useState(
    user.role === 'admin'
      ? 'to confirm done the transaction'
      : 'to delete the transaction',
  );
  useEffect(() => {
    const getHistoryUser = async () => {
      try {
        dispatch(isLoading());
        // cek token
        const token = await GenerateToken(login);
        let newToken = login;
        newToken['tokenkey'] = token;
        dispatch(successLogin(newToken));
        const result = await getHistory(limit, token);
        setHistory(result.data.data);
        setData(result.data.meta.totalData);
        console.log(result.data.data);
        console.log(result.data.meta.totalData);
        if (result.data.meta.totalData === 0) {
          navigation.replace('Order404');
        }

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
  }, [limit]);
  // delete handler
  const deleteHandler = async () => {
    try {
      dispatch(isLoading());
      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      //  delete transaction
      const data = {id: id};
      await deleteTransaction(data, token);
      //  get data
      setLimit(6);
      const result = await getHistory(limit, token);
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
  const confirmHandler = async () => {
    try {
      dispatch(isLoading());
      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      //  confirm transaction
      const data = {id: id};
      await doneTransaction(data, token);
      // get data
      setLimit(6);
      const result = await getHistory(limit, token);
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
  return (
    <>
      <ReactNativeModal
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        isVisible={visible}>
        <ModalConfirm
          handler={handler === 'delete' ? deleteHandler : confirmHandler}
          msg={msg}
          cb={setVisible}
        />
      </ReactNativeModal>
      <View style={styles.containerMain}>
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
          <Text style={styles.textTriger}>
            {user.role === 'admin'
              ? 'swipe on an item when it’s done'
              : 'swipe on an item to delete'}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            // height: '100%',
            paddingBottom: 50,
          }}>
          <View
            style={{
              marginTop: 20,
              paddingBottom: 170,
              height: '100%',
            }}>
            <>
              <FlatList
                data={history}
                horizontal={false}
                nestedScrollEnabled={true}
                onEndReached={() =>
                  history.length !== data || history.length === 0
                    ? setLimit(limit + 6)
                    : ''
                }
                maxToRenderPerBatch={data}
                renderItem={({item, idx}) => (
                  <>
                    <View>
                      <ScrollView
                        horizontal
                        contentContainerStyle={{
                          height: 150,
                          width: '125%',
                          paddingHorizontal: '10%',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Transaction', {id: item.id})
                          }
                          key={idx}
                          style={styles.boxItem}>
                          <Ionicons
                            name="receipt-outline"
                            color={'black'}
                            size={69}></Ionicons>
                          <View style={styles.boxInfo}>
                            <Text style={styles.textBold}>
                              {item.payment_method}
                            </Text>
                            <Text style={styles.textPrice}>
                              IDR {item.total}
                            </Text>
                            <Text style={styles.textDate}>
                              {item.created_at.split('T')[0]}
                            </Text>
                            <Text style={styles.textPrice}>{item.status}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setVisible(true);
                            setId([item.id]);
                          }}
                          style={{
                            backgroundColor: '#6A4029',
                            width: 45,
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                          }}>
                          <Ionicons
                            name={
                              user.role === 'admin'
                                ? 'checkmark-outline'
                                : 'trash-outline'
                            }
                            color={'white'}
                            size={16}></Ionicons>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  </>
                )}
              />
              {Load === true ? (
                <>
                  <View
                    style={{
                      width: '100%',
                      position: 'absolute',
                      marginTop: '20%',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size={'large'} color="#6A4029" />
                  </View>
                </>
              ) : (
                ''
              )}
            </>
          </View>
        </View>
      </View>
    </>
  );
};

export default History;
