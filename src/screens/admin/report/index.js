import {View, Text, ScrollView, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/loading';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import {getReportDaily} from '../../../modules/transaction/getReportDaily';
import {getReportMonthly} from '../../../modules/transaction/getReportMonthly';
import {GenerateToken} from '../../../modules/auth/checkAuth';

const Report = ({navigation}) => {
  const [monthly, setMonthly] = useState([]);
  const [daily, setDaily] = useState([]);
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const getReport = async () => {
      try {
        dispatch(isLoading());
        // cek token
        const token = await GenerateToken(login);
        let newToken = login;
        newToken['tokenkey'] = token;
        // get report data
        const report1 = await getReportDaily(token);
        const report2 = await getReportMonthly(token);
        setDaily(report1.data.data);
        setMonthly(report2.data.data);
        dispatch(doneLoading());
      } catch (error) {
        console.log(error);
        console.log(error.request.status);
        dispatch(doneLoading());
        if (error.request.status !== 400) {
          if (error.request.status === 401) {
            dispatch(failLogin());
            navigation.replace('Login', {notif: 'authentication has expired'});
          }
          //   const screen = ErrorsHandler(error.request.status);
          //   console.log(screen);
          //   navigation.navigate(screen);
        }
      }
    };
    getReport();
  }, []);
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <ScrollView alwaysBounceVertical style={styles.containerMain}>
          <View style={styles.boxMain}>
            <View style={styles.boxHead}>
              <Text style={styles.textHead}>Monthly Report</Text>
              <Ionicons
                name="ellipsis-horizontal-outline"
                color={'black'}
                size={30}></Ionicons>
            </View>
            <Text style={styles.textInfo}>Last 6 months</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                height: 238,
              }}>
              <View style={styles.infoChart}>
                <View style={styles.infoHead}>
                  <Text style={styles.textRange}>IDR 5M</Text>
                  <Text style={styles.textRange}>IDR 3M</Text>
                  <Text style={styles.textRange}>IDR 0K</Text>
                </View>
                <View style={styles.infoFoot}></View>
              </View>
              <View style={styles.mainChart}>
                <View style={styles.boxChart}>
                  {monthly.map(item => (
                    <>
                      <View style={styles.boxBullet}>
                        <View
                          style={{
                            width: 8,
                            height: `${(item.total / 5000000) * 100}%`,
                            backgroundColor: '#FFBA33',
                            borderRadius: 4,
                          }}></View>
                      </View>
                    </>
                  ))}
                </View>
                <View style={styles.listChart}>
                  {monthly.map(item => (
                    <>
                      <View style={styles.boxList}>
                        <Text style={styles.textList}>{item.month}</Text>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.infoLegend}>
                <Ionicons
                  name="radio-button-on-outline"
                  color={'#FFBA33'}
                  size={10}></Ionicons>
                <Text style={styles.textFoot}>Income</Text>
              </View>
              <View style={styles.infoLegend}>
                <Ionicons
                  name="radio-button-on-outline"
                  color={'#6A4029'}
                  size={10}></Ionicons>
                <Text style={styles.textFoot}>Outcome</Text>
              </View>
            </View>
          </View>
          <View style={styles.boxDaily}>
            <View style={styles.boxHead}>
              <Text style={styles.textTitle}>IDR 2.5M</Text>
              <Ionicons
                name="ellipsis-horizontal-outline"
                color={'black'}
                size={30}></Ionicons>
            </View>
            <Text style={styles.textInfo}>Daily average</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 30,
                height: 238,
              }}>
              <View style={styles.infoChart}>
                <View style={styles.infoHead}>
                  <Text style={styles.textRange}>2.5M</Text>
                  <Text style={styles.textRange}>1M</Text>
                  <Text style={styles.textRange}>700K</Text>
                  <Text style={styles.textRange}>0K</Text>
                </View>
                <View style={styles.infoFoot}></View>
              </View>
              <View style={styles.mainChart}>
                <View style={styles.boxChartDaily}>
                  {daily.map(item => (
                    <View style={styles.boxBullet}>
                      <View
                        style={{
                          width: 20,
                          height: `${(item.total / 2500000) * 100}%`,
                          backgroundColor: '#FFBA33',
                          borderRadius: 4,
                        }}></View>
                    </View>
                  ))}
                </View>
                <View style={styles.listChart}>
                  {daily.map(item => (
                    <View style={styles.boxList}>
                      <Text style={styles.textListDaily}>{item.day}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lastBox}>
            <Text style={styles.textUp}>Goals</Text>
            <Text style={styles.textDesc}>
              Your goals is still on 76%. Keep up the good work!
            </Text>
            <View style={styles.imgView}>
              <View style={styles.boxText}>
                <Text style={styles.textLast}>76%</Text>
              </View>
              <Image
                style={{
                  position: 'absolute',
                  width: 160,
                  height: 160,
                  zIndex: 11,
                }}
                source={require('../../../assets/img/progres.png')}
              />
            </View>
            <Ionicons
              name="ellipsis-horizontal-outline"
              color={'rgba(115, 136, 169, 0.353283)'}
              size={40}></Ionicons>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Report;
