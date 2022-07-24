import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../style';
import {Link} from '@react-navigation/native';
import {getProducts} from '../../../modules/products/getProducts';
import ErrorsHandler from '../../../helper/errorHandler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/loading';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchProducts} from '../../../modules/products/searchProducts';
import SelectDropdown from 'react-native-select-dropdown';
import {getProductsAll} from '../../../modules/products/getProductsAll';
import ReactNativeModal from 'react-native-modal';

const scroll = React.createRef();

const Product = ({route, navigation}) => {
  const {categoryKey} = route.params;
  const Load = useSelector(state => state.loading.status);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(true);
  const [promo, setPromo] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [noncoffee, setNoncoffee] = useState(false);
  const [food, setFood] = useState(false);
  const [all, setAll] = useState(false);
  const [categoryValue, setCategoryValue] = useState(categoryKey);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [key, setKey] = useState('');
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');
  const [limit, setLimit] = useState(6);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    const productsHandler = async () => {
      try {
        // cek category

        if (categoryValue === 'all' || search !== '') {
          setCategoryValue('all');
          setFavorite(false);
          setPromo(false);
          setCoffee(false);
          setNoncoffee(false);
          setFood(false);
          setAll(true);
        }
        if (categoryValue === 'favorite') {
          setFavorite(true);
          setPromo(false);
          setCoffee(false);
          setNoncoffee(false);
          setFood(false);
          setAll(false);
        }
        if (categoryValue === 'promo') {
          setFavorite(false);
          setPromo(true);
          setCoffee(false);
          setNoncoffee(false);
          setFood(false);
          setAll(false);
        }
        if (categoryValue === 'coffee') {
          setFavorite(false);
          setPromo(false);
          setCoffee(true);
          setNoncoffee(false);
          setFood(false);
          setAll(false);
        }
        if (categoryValue === 'noncoffee') {
          setFavorite(false);
          setPromo(false);
          setCoffee(false);
          setNoncoffee(true);
          setFood(false);
          setAll(false);
        }
        if (categoryValue === 'food') {
          setFavorite(false);
          setPromo(false);
          setCoffee(false);
          setNoncoffee(false);
          setFood(true);
          setAll(false);
        }
        dispatch(isLoading());
        let url =
          categoryValue === 'favorite'
            ? `/product/favorite?limit=${limit}${
                sort !== '' ? `&sort=${sort}` : ''
              }${order !== '' ? `&order=${order}` : ''}`
            : `/product?limit=${limit}${
                categoryValue === '' || categoryValue === 'all'
                  ? ''
                  : `&category=${categoryValue}`
              }${search !== '' ? `&name=${search}` : ''}${
                sort !== '' && sort !== 'Sort By' ? `&sort=${sort}` : ''
              }${order !== '' ? `&order=${order}` : ''}`;

        const result = await getProductsAll(url);

        setProduct(result.data.data);
        setCount(result.data.meta.totalData);
        dispatch(doneLoading());
      } catch (error) {
        console.log(error);
        dispatch(doneLoading());
        if (error.request.status !== 400) {
          if (error.request.status === 404) {
            setProduct([]);
            setCount(0);
          }
          ErrorsHandler(error.request.status);
        }
      }
    };
    productsHandler();
  }, [limit, categoryValue, sort, order, search]);

  const categoryHandler = async category => {
    try {
      dispatch(isLoading());
      setCategoryValue(category);
      setLimit(6);
      if (category === 'favorite') {
        setFavorite(true);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
      }
      if (category === 'promo') {
        setFavorite(false);
        setPromo(true);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
      }
      if (category === 'coffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(true);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
      }
      if (category === 'noncoffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(true);
        setFood(false);
        setAll(false);
      }
      if (category === 'food') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(true);
        setAll(false);
      }
      if (category === 'all') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(true);
      }
      setSort('');
      setOrder('asc');
      setSearch('');
      setProduct([]);
      dispatch(doneLoading());
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const searchHandler = () => {
    setSearch(key);
  };

  return (
    <>
      {Load === true && product.length === 0 ? (
        <Loading />
      ) : (
        <>
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
                    navigation.navigate('AddPromo');
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
          <View ref={scroll} style={styles.containerMain}>
            <Text style={styles.headerTextProduct}>
              {categoryValue === 'all' ? 'All Products' : categoryValue}
            </Text>
            <View style={styles.searchInput}>
              <TouchableOpacity onPress={() => searchHandler()}>
                <Ionicons name="search-outline" size={18} color="#6A4029" />
              </TouchableOpacity>
              <TextInput
                style={styles.inputBox}
                value={key}
                onChangeText={search => setKey(search)}
                placeholder="Search"
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}></TextInput>
            </View>
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
                <TouchableOpacity
                  onPress={() => categoryHandler('all')}
                  style={
                    all === true ? styles.listMenuActive : styles.listMenu
                  }>
                  <Text
                    style={
                      all === true ? styles.menuTextActive : styles.menuText
                    }>
                    All
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.sortBox}>
              <SelectDropdown
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: '#6A4029',
                  borderRadius: 10,
                  width: '40%',
                }}
                buttonTextStyle={{
                  fontFamily: 'Poppins',
                  fontSize: 15,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 26,
                  color: '#6A4029',
                }}
                rowStyle={{
                  borderColor: '#6A4029',
                  borderWidth: 1,
                  flex: 1,
                }}
                defaultValue={'Sort By'}
                data={['Sort By', 'price', 'time']}
                selectedRowStyle={{color: 'red'}}
                onSelect={(selectedItem, index) => {
                  setSort(selectedItem);
                }}
              />
              <SelectDropdown
                buttonStyle={{
                  width: '40%',
                  borderWidth: 1,
                  borderColor: '#6A4029',
                  borderRadius: 10,
                  marginRight: '10%',
                }}
                buttonTextStyle={{
                  fontFamily: 'Poppins',
                  fontSize: 15,
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 26,
                  color: '#6A4029',
                }}
                rowStyle={{
                  borderColor: '#6A4029',
                  borderWidth: 1,
                  flex: 1,
                }}
                style={styles.sortInput}
                defaultValue={'Order By'}
                data={['Order By', 'desc', 'asc']}
                selectedRowStyle={{color: 'red'}}
                onSelect={(selectedItem, index) => {
                  setOrder(selectedItem);
                }}
              />
              {/* <TouchableOpacity
                onPress={() => sortHandler()}
                style={styles.btnSort}>
                <Text style={{fontWeight: '400', fontSize: 18}}>Sorting</Text>
              </TouchableOpacity> */}
            </View>
            {product.length > 0 ? (
              <>
                <View style={styles.boxProduct}>
                  <View>
                    <View style={styles.listItemProduct}>
                      <FlatList
                        data={product}
                        numColumns={2}
                        keyExtractor={(item, index) => item.stock_id}
                        onEndReached={() =>
                          product.length !== count ? setLimit(limit + 6) : ''
                        }
                        renderItem={({item, idx}) => (
                          <>
                            {user.role === 'admin' ? (
                              <View style={styles.itemProduct}>
                                <Image
                                  style={styles.itemImgProduct}
                                  source={{
                                    uri: item.img,
                                  }}
                                />
                                <TouchableOpacity
                                  style={styles.iconEditProduct}>
                                  <Ionicons
                                    color={'white'}
                                    size={17}
                                    name="pencil-outline"></Ionicons>
                                </TouchableOpacity>
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={{color: 'black'}}>
                                  {item.size}
                                </Text>
                                <Text style={styles.itemPrice}>
                                  IDR {item.price}
                                </Text>
                              </View>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('Detail', {
                                    id: item.id,
                                    size: item.size,
                                  })
                                }
                                style={styles.itemProduct}>
                                <Image
                                  style={styles.itemImgProduct}
                                  source={{
                                    uri: item.img,
                                  }}
                                />
                                <Text style={styles.itemText}>{item.name}</Text>
                                <Text style={{color: 'black'}}>
                                  {item.size}
                                </Text>
                                <Text style={styles.itemPrice}>
                                  IDR {item.price}
                                </Text>
                              </TouchableOpacity>
                            )}
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
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <Text style={{color: 'black', fontWeight: '900'}}>
                    Products Not Found
                  </Text>
                  <Image
                    style={{width: '70%', height: 250}}
                    source={require('../../../assets/img/pagenotfound.png')}
                  />
                </View>
              </>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default Product;
