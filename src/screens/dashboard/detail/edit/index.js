import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {getProductDetail} from '../../../../modules/products/getProductDetail';
import {doneLoading, isLoading} from '../../../../redux/actionCreator/loading';
import Loading from '../../../component/loading';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addChart} from '../../../../redux/actionCreator/chart';
import ReactNativeModal from 'react-native-modal';
import {addProduct} from '../../../../redux/actionCreator/product';
import ErrorsHandler from '../../../../helper/errorHandler';
import ModalImg from '../../../component/modals/ModalImg';
import ModalFail from '../../../component/modals/ModalFail';
import {editProduct} from '../../../../modules/products/editProduct';
import {editStock} from '../../../../modules/products/editStock';
import {GenerateToken} from '../../../../modules/auth/checkAuth';
import {successLogin} from '../../../../redux/actionCreator/login';

const EditProduct = ({route, navigation}) => {
  // data
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const login = useSelector(state => state.login.auth);
  const product = useSelector(state => state.product.product);
  const chart = useSelector(state => state.chart);
  const Load = useSelector(state => state.loading.status);
  const [visible, setVisible] = useState(false);
  const [Name, setName] = useState(product.name);
  const [Price, setPrice] = useState(product.price);
  const [Description, setDescription] = useState(product.description);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Msg, setMsg] = useState(false);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [view, setView] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(isLoading());
        // get product detail
        console.log(product);
        const result = await getProductDetail(product.id);

        setProducts(result.data.data);
        result.data.data.map(item =>
          item.size === product.size ? setProductDetail(item) : '',
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

  // img picker
  const openCam = async () => {
    try {
      const camera = await launchCamera({saveToPhotos: true});
      setView({
        view: camera.assets[0].uri,
        path: camera,
      });
    } catch (error) {}
  };
  const openStorage = async () => {
    try {
      const storage = await launchImageLibrary();
      setView({
        view: storage.assets[0].uri,
        path: storage,
      });
    } catch (error) {}
  };

  // update handler
  const updateHandler = async () => {
    try {
      dispatch(isLoading());
      // set data
      let formProduct = new FormData();
      let imgData;
      if (file !== null) {
        imgData = {
          uri: file.assets[0].uri,
          size: file.assets[0].fileSize,
          name: file.assets[0].fileName,
          type: file.assets[0].type,
        };
      }
      file !== null ? formProduct.append('photo', imgData) : setFile(null);
      Name !== null ? formProduct.append('name', Name) : setName(null);
      Description !== null
        ? formProduct.append('description', Description)
        : setDescription(null);

      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // add product
      await editProduct(token, formProduct, product.id);

      // edit stock
      let FormStock = {
        price: Price.toString(),
      };
      await editStock(token, FormStock, product.stock_id);
      // success
      const result = await getProductDetail(product.id);
      result.data.data.map(item =>
        item.size === product.size ? dispatch(addProduct(item)) : '',
      );
      dispatch(doneLoading());
      navigation.replace('Detail');
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      setIsError(true);
      setMsg(error.response.data.message);
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.replace('Home', {
            screen: 'Home',
            params: {notif: 'Product updated successfully'},
          });
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };

  return (
    <>
      {Load === true && products.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={visible}>
            <ModalImg
              icon={'camera-outline'}
              msg={''}
              cb={setVisible}
              opencam={openCam}
              openstorage={openStorage}
              img={view}
              save={setImg}
              file={setFile}
            />
          </ReactNativeModal>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={isError}>
            <ModalFail msg={Msg} cb={setIsError} />
          </ReactNativeModal>
          <ScrollView style={styles.containerMain}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.imgBox}>
              <Image
                style={styles.imgProduct}
                source={{uri: img === null ? productDetail.img : img}}
              />
            </TouchableOpacity>
            <View style={styles.imgBox}>
              <TextInput
                onChangeText={text => setName(text)}
                style={styles.nameProduct}
                value={Name}
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.priceProductText}>IDR </Text>
                <TextInput
                  onChangeText={text => setPrice(text)}
                  style={styles.priceProduct}
                  keyboardType={'numeric'}
                  value={Price.toString()}
                />
              </View>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.textHeading}>Delivery info</Text>
              <Text style={styles.textDesc}>
                Delivered only on monday until friday from 1 pm to 7 pm
              </Text>
            </View>
            <View style={styles.boxText}>
              <Text style={styles.textHeading}>Description</Text>
              <TextInput
                onChangeText={text => setDescription(text)}
                style={styles.textDesc}
                value={Description}
              />

              <TouchableOpacity
                onPress={() => updateHandler()}
                style={styles.btnDetail}>
                <Text style={styles.textBtnDetail}>Save change</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default EditProduct;
