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

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState(0);
  const [limit, setLimit] = useState(6);
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
        console.log(data);

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
  return (
    <View style={styles.containerMain}>
      <Text style={styles.textTitle}>Order History</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name="hand-left-outline" color={'black'} size={20}></Ionicons>
        <Text style={styles.textTriger}>swipe on an item to delete</Text>
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
              onEndReached={() =>
                history.length !== data ? setLimit(limit + 6) : ''
              }
              maxToRenderPerBatch={data}
              renderItem={({item, idx}) => (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Transaction', {id: item.id})
                    }
                    key={idx}
                    style={styles.boxItem}>
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
                  </TouchableOpacity>
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
  );
};

export default History;
