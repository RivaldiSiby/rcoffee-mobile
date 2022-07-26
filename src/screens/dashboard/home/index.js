import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import {getProducts} from '../../../modules/products/getProducts';
import ErrorsHandler from '../../../helper/errorHandler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/loading';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import ReactNativeModal from 'react-native-modal';
import ModalSuccess from '../../component/modals/ModalSuccess';
import {addProduct} from '../../../redux/actionCreator/product';

const Home = ({navigation, route}) => {
  const {notif} = route.params;
  const login = useSelector(state => state.login);
  const Load = useSelector(state => state.loading.status);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(true);
  const [promo, setPromo] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [noncoffee, setNoncoffee] = useState(false);
  const [food, setFood] = useState(false);
  const [product, setProduct] = useState([]);
  const [categoryKey, setCategoryKey] = useState('favorite');
  const [visible, setVisible] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        dispatch(isLoading());
        await GenerateToken(login.auth);
        dispatch(doneLoading());
        if (notif !== null) {
          setVisible(true);
        }
        return;
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
    checkLogin();
  }, []);

  useEffect(() => {
    dispatch(isLoading());
    getProducts('favorite')
      .then(result => {
        setProduct(result.data.data);
        dispatch(doneLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(doneLoading());
        if (error.request.status !== 400) {
          ErrorsHandler(error.request.status);
        }
      });
  }, []);

  const categoryHandler = async category => {
    try {
      dispatch(isLoading());
      setProduct([]);
      setCategoryKey(category);
      if (category === 'favorite') {
        setFavorite(true);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        const result = await getProducts('favorite');
        setProduct(result.data.data);
      }
      if (category === 'promo') {
        setFavorite(false);
        setPromo(true);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        // const result = await getProducts('promo')
        // setProduct(result.data.data);
      }
      if (category === 'coffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(true);
        setNoncoffee(false);
        setFood(false);
        const result = await getProducts('coffee');
        setProduct(result.data.data);
      }
      if (category === 'noncoffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(true);
        setFood(false);
        const result = await getProducts('noncoffee');
        setProduct(result.data.data);
      }
      if (category === 'food') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(true);
        const result = await getProducts('food');
        setProduct(result.data.data);
      }
      dispatch(doneLoading());
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  return (
    <>
      {Load === true && product.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={visible}>
            <ModalSuccess msg={notif} cb={setVisible} />
          </ReactNativeModal>
          <ReactNativeModal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={add}>
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                margin: 0,
                left: '5%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setAdd(false)}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#6A4029',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  color={'white'}
                  size={35}
                  name="add-outline"></Ionicons>
              </TouchableOpacity>
              <View style={{marginLeft: 15}}>
                <TouchableOpacity
                  onPress={() => {
                    setAdd(false);
                    navigation.navigate('AddProduct');
                  }}
                  style={styles.addBtn}>
                  <Text style={styles.addText}>New product</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAdd(false);
                    navigation.navigate('AddPromo', {id: null});
                  }}
                  style={styles.addBtn}>
                  <Text style={styles.addText}>New promo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ReactNativeModal>
          {user.role === 'admin' ? (
            <>
              {add === true ? (
                ''
              ) : (
                <TouchableOpacity
                  onPress={() => setAdd(true)}
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    width: 50,
                    left: '10%',
                    height: 50,
                    zIndex: 11,
                    backgroundColor: '#6A4029',
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    color={'white'}
                    size={35}
                    name="add-outline"></Ionicons>
                </TouchableOpacity>
              )}
            </>
          ) : (
            ''
          )}
          <ScrollView style={styles.containerMain}>
            <Text style={styles.headerText}>A good coffee is a good day</Text>
            <TouchableOpacity
              style={styles.searchInput}
              onPress={() =>
                navigation.navigate('Product', {categoryKey: 'search'})
              }>
              <Ionicons name="search-outline" size={18} color="#6A4029" />
              <TextInput
                editable={false}
                style={styles.inputBox}
                placeholder="Search"
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}></TextInput>
            </TouchableOpacity>
            <View>
              <ScrollView horizontal vertical={false} style={styles.menuBar}>
                <TouchableOpacity
                  onPress={() => categoryHandler('favorite')}
                  style={
                    favorite === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      favorite === true
                        ? styles.menuTextActive
                        : styles.menuText
                    }>
                    Favorite
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => categoryHandler('promo')}
                  style={
                    promo === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      promo === true ? styles.menuTextActive : styles.menuText
                    }>
                    Promo
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => categoryHandler('coffee')}
                  style={
                    coffee === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      coffee === true ? styles.menuTextActive : styles.menuText
                    }>
                    Coffee
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => categoryHandler('noncoffee')}
                  style={
                    noncoffee === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      noncoffee === true
                        ? styles.menuTextActive
                        : styles.menuText
                    }>
                    Non Coffee
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => categoryHandler('food')}
                  style={
                    food === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      food === true ? styles.menuTextActive : styles.menuText
                    }>
                    Food
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Product', {categoryKey: categoryKey})
              }>
              <Text style={styles.textLink}>See more</Text>
            </TouchableOpacity>
            <View>
              <ScrollView horizontal vertical={false} style={styles.listItem}>
                {product.map(list => (
                  <>
                    {user.role === 'admin' ? (
                      <>
                        <View style={styles.item}>
                          <Image
                            style={styles.itemImg}
                            source={{
                              uri: list.img,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(addProduct(list));
                              navigation.navigate('Detail');
                            }}
                            style={styles.iconEdit}>
                            <Ionicons
                              color={'white'}
                              size={17}
                              name="pencil-outline"></Ionicons>
                          </TouchableOpacity>
                          <Text style={styles.itemText}>{list.name}</Text>
                          <Text style={{color: 'black'}}>{list.size}</Text>
                          <Text style={styles.itemPrice}>IDR {list.price}</Text>
                        </View>
                      </>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(addProduct(list));
                          navigation.navigate('Detail');
                        }}
                        style={styles.item}>
                        <Image
                          style={styles.itemImg}
                          source={{
                            uri: list.img,
                          }}
                        />

                        <Text style={styles.itemText}>{list.name}</Text>
                        <Text style={{color: 'black'}}>{list.size}</Text>
                        <Text style={styles.itemPrice}>IDR {list.price}</Text>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Home;
