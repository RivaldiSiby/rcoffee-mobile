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
import {Link} from '@react-navigation/native';
import {getProducts} from '../../../modules/products/getProducts';
import ErrorsHandler from '../../../helper/errorHandler';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../loading';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {searchProducts} from '../../../modules/products/searchProducts';
import SelectDropdown from 'react-native-select-dropdown';
import {getProductsAll} from '../../../modules/products/getProductsAll';

const scroll = React.createRef();

const Product = ({route, navigation}) => {
  const {categoryKey} = route.params;
  const Load = useSelector(state => state.loading.status);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(true);
  const [url, setUrl] = useState(
    categoryKey === 'favorite'
      ? '/product/favorite?limit=12'
      : `/product?limit=12&category=${categoryKey}`,
  );
  const [promo, setPromo] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [noncoffee, setNoncoffee] = useState(false);
  const [food, setFood] = useState(false);
  const [all, setAll] = useState(false);
  const [categoryValue, setCategoryValue] = useState(categoryKey);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [paginationNumber, setPaginationNumber] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');
  useEffect(() => {
    dispatch(isLoading());
    categoryHandler(categoryKey);
    getProducts(categoryKey)
      .then(result => {
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);

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
      setSort('');
      setOrder('asc');
      setSearch('');
      setProduct([]);
      setCategoryValue(category);
      if (category === 'favorite') {
        setFavorite(true);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
        const result = await getProducts('favorite');
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);
      }
      if (category === 'promo') {
        setFavorite(false);
        setPromo(true);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
        // const result = await getProducts('promo')
        //setProduct(result.data.data);
        //   setPagination(result.data.meta)
      }
      if (category === 'coffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(true);
        setNoncoffee(false);
        setFood(false);
        setAll(false);
        const result = await getProducts('coffee');
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);
      }
      if (category === 'noncoffee') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(true);
        setFood(false);
        setAll(false);
        const result = await getProducts('noncoffee');
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);
      }
      if (category === 'food') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(true);
        setAll(false);
        const result = await getProducts('food');
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);
      }
      if (category === 'all') {
        setFavorite(false);
        setPromo(false);
        setCoffee(false);
        setNoncoffee(false);
        setFood(false);
        setAll(true);
        const result = await getProducts('all');
        if (result.data.meta.totalPage > 1) {
          let number = [];
          for (let i = 1; i <= result.data.meta.totalPage; i++) {
            number.push(i);
          }

          setPaginationNumber(number);
        }
        setProduct(result.data.data);
        setPagination(result.data.meta);
      }
      //   set url
      console.log(category);
      let urlParams =
        category === 'favorite'
          ? `/product/favorite?limit=12`
          : `/product?limit=12&category=${category}`;
      urlParams = category === 'all' ? `/product?limit=12` : urlParams;
      setUrl(urlParams);
      dispatch(doneLoading());
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const searchHandler = async () => {
    try {
      dispatch(isLoading());
      setProduct([]);
      setFavorite(false);
      setPromo(false);
      setCoffee(false);
      setNoncoffee(false);
      setCategoryValue('all');
      setAll(true);
      const result = await searchProducts(search);
      setUrl(`/product?limit=12&name=${search}`);
      if (result.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= result.data.meta.totalPage; i++) {
          number.push(i);
        }

        setPaginationNumber(number);
      }
      setProduct(result.data.data);
      setPagination(result.data.meta);

      dispatch(doneLoading());
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const sortHandler = async () => {
    try {
      const cekOrder = url.indexOf('order');
      const cekSort = url.indexOf('sort');
      let urlKey = `${url}${
        (sort === '') | (sort === 'Sort By') ? '' : '&sort=' + sort
      }&order=${order}`;
      console.log(url);
      console.log(cekOrder, cekSort);
      if (cekOrder !== -1 || cekSort !== -1) {
        let urlFirst = `/product?limit=12${
          categoryValue === '' || categoryValue === 'all'
            ? ''
            : `&category=${category}`
        }`;
        urlFirst =
          categoryValue === 'favorite'
            ? '/product/favorite?limit=12'
            : urlFirst;
        urlFirst =
          search !== '' ? `/product?limit=12&name=${search}` : urlFirst;
        urlKey = `${urlFirst}${
          sort !== '' ? '&sort=' + sort : ''
        }&order=${order}`;
      }
      console.log(urlKey);

      const result = await getProductsAll(urlKey);
      if (result.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= result.data.meta.totalPage; i++) {
          number.push(i);
        }

        setPaginationNumber(number);
      }
      setProduct(result.data.data);
      setPagination(result.data.meta);
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const paginationHandler = async page => {
    try {
      dispatch(isLoading());
      setUrl(page);
      console.log(page);
      const products = await getProductsAll(page);
      if (products.data.meta.totalPage > 1) {
        let number = [];
        for (let i = 1; i <= products.data.meta.totalPage; i++) {
          number.push(i);
        }

        setPaginationNumber(number);
      }
      setProduct(products.data.data);
      setPagination(products.data.meta);
      scroll.current.scrollTo({x: 0, y: 0, animated: true});
      dispatch(doneLoading());
    } catch (error) {
      dispatch(doneLoading());
    }
  };
  return (
    <>
      {Load === true && product.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ScrollView ref={scroll} style={styles.containerMain}>
            <Text style={styles.headerTextProduct}>
              {categoryValue === 'all' ? 'All Products' : categoryValue}
            </Text>
            <View style={styles.searchInput}>
              <TouchableOpacity onPress={() => searchHandler()}>
                <Ionicons name="search-outline" size={18} color="#6A4029" />
              </TouchableOpacity>
              <TextInput
                style={styles.inputBox}
                value={search}
                onChangeText={search => setSearch(search)}
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
              <TouchableOpacity
                onPress={() => sortHandler()}
                style={styles.btnSort}>
                <Text style={{fontWeight: '400', fontSize: 18}}>Sorting</Text>
              </TouchableOpacity>
            </View>
            {product.length > 0 ? (
              <>
                <View style={styles.boxProduct}>
                  <ScrollView vertical>
                    <View style={styles.listItemProduct}>
                      {product.map(list => (
                        <>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Detail', {
                                id: list.id,
                                size: list.size,
                              })
                            }
                            style={styles.itemProduct}>
                            <Image
                              style={styles.itemImgProduct}
                              source={{
                                uri: list.img,
                              }}
                            />
                            <Text style={styles.itemText}>{list.name}</Text>
                            <Text style={{color: 'black'}}>{list.size}</Text>
                            <Text style={styles.itemPrice}>
                              IDR {list.price}
                            </Text>
                          </TouchableOpacity>
                        </>
                      ))}
                    </View>
                  </ScrollView>
                </View>
                {pagination.totalPage > 1 ? (
                  <>
                    <View style={styles.boxPagination}>
                      {pagination.prev !== undefined ? (
                        <TouchableOpacity
                          onPress={() => paginationHandler(pagination.prev)}
                          style={styles.bulletBtn}>
                          <Text style={styles.bulletTextBtn}>Prev</Text>
                        </TouchableOpacity>
                      ) : (
                        ''
                      )}
                      {paginationNumber.map(page =>
                        parseInt(pagination.page) === page ? (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                paginationHandler(
                                  `/product?limit=12&page=${page}${
                                    (categoryValue === '') |
                                    (categoryValue === 'all')
                                      ? ''
                                      : '&category=' + categoryValue
                                  }`,
                                )
                              }
                              style={styles.bulletActive}>
                              <Text style={styles.bulletTextActive}>
                                {page}
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <>
                            <TouchableOpacity
                              style={styles.bullet}
                              onPress={() =>
                                paginationHandler(
                                  `/product?limit=12&page=${page}${
                                    (categoryValue === '') |
                                    (categoryValue === 'all')
                                      ? ''
                                      : '&category=' + categoryValue
                                  }`,
                                )
                              }>
                              <Text style={styles.bulletText}>{page}</Text>
                            </TouchableOpacity>
                          </>
                        ),
                      )}

                      {pagination.next !== undefined ? (
                        <TouchableOpacity
                          onPress={() => paginationHandler(pagination.next)}
                          style={styles.bulletBtn}>
                          <Text style={styles.bulletTextBtn}>Next</Text>
                        </TouchableOpacity>
                      ) : (
                        ''
                      )}
                    </View>
                  </>
                ) : (
                  ''
                )}
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
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Product;
