import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {getProductDetail} from '../../../modules/products/getProductDetail';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import Loading from '../../loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addChart} from '../../../redux/actionCreator/chart';
import ReactNativeModal from 'react-native-modal';

const Detail = ({route, navigation}) => {
  // data
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const {id, size} = route.params;
  const login = useSelector(state => state.login);
  const chart = useSelector(state => state.chart);
  const Load = useSelector(state => state.loading.status);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(isLoading());
        // get product detail
        const product = await getProductDetail(id);

        setProducts(product.data.data);
        product.data.data.map(product =>
          product.size === size ? setProductDetail(product) : '',
        );
        dispatch(doneLoading());
      } catch (error) {
        console.log(error);
        dispatch(doneLoading());
        if (error.request.status !== 400) {
          ErrorsHandler(error.request.status);
        }
      }
    };
    getData();
    console.log(chart);
  }, []);
  const addChartHandler = async () => {
    try {
      // add data ke card locastorage
      const dataProduct = {
        id: productDetail.stock_id,
        name: productDetail.name,
        price: productDetail.price,
        size: productDetail.size,
        img: productDetail.img,
        quantity: quantity,
      };
      setQuantity(1);

      setVisible(true);
      if (chart.chart.length > 0) {
        const checkProduct = chart.chart.findIndex(
          item => item.id === dataProduct.id,
        );
        if (checkProduct !== -1) {
          chart.chart[checkProduct].quantity =
            chart.chart[checkProduct].quantity + dataProduct.quantity;
          const data = [...chart.chart];
          dispatch(addChart(data));
          return;
        }
        const data = [...chart.chart, dataProduct];
        dispatch(addChart(data));
        return;
      }

      dispatch(addChart([dataProduct]));
      return;
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      if (error.request.status !== 400) {
        ErrorsHandler(error.request.status);
      }
    }
  };
  const sizeHandler = size => {
    products.map(product =>
      product.size === size ? setProductDetail(product) : '',
    );

    navigation.navigate('Detail', {
      id: id,
      size: size,
    });
    setQuantity(1);
  };
  return (
    <>
      {Load === true && products.length === 0 ? (
        <Loading />
      ) : (
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
                Success Add Product
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '900',
                  paddingVertical: 10,
                }}>
                {productDetail.name}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '400',
                }}>
                {productDetail.size}
              </Text>
              <Text
                style={{
                  color: '#895537',
                  fontWeight: '400',
                }}>
                IDR {productDetail.price}
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{marginTop: 50}}>
                <Ionicons
                  name="close-outline"
                  size={25}
                  color={'red'}></Ionicons>
              </TouchableOpacity>
            </View>
          </ReactNativeModal>
          <ScrollView style={styles.containerMain}>
            <View style={styles.imgBox}>
              <Image
                style={styles.imgProduct}
                source={{uri: productDetail.img}}
              />
            </View>
            <View style={styles.imgBox}>
              <Text style={styles.nameProduct}>{productDetail.name}</Text>
              <Text style={styles.priceProduct}>IDR {productDetail.price}</Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.textHeading}>Delivery info</Text>
              <Text style={styles.textDesc}>
                Delivered only on monday until friday from 1 pm to 7 pm
              </Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.textHeading}>Description</Text>
              <Text style={styles.textDesc}>{productDetail.description}</Text>
              <View style={styles.bulletBox}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.textHeading}>Choose a size</Text>
                </View>
                {products.map(product =>
                  product.size === productDetail.size ? (
                    <TouchableOpacity
                      onPress={() => sizeHandler(product.size)}
                      style={styles.bulletActive}>
                      <Text style={styles.textBulletActive}>
                        {product.size}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => sizeHandler(product.size)}
                      style={styles.bullet}>
                      <Text style={styles.textBullet}>{product.size}</Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
              <TouchableOpacity
                onPress={() => addChartHandler()}
                style={styles.btnDetail}>
                <Text style={styles.textBtnDetail}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Detail;
